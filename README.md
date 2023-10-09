# Descrição

Este é um sistema para listar, adicionar, editar e excluir cadastros de agricultores.

O projeto é composto por dois pacotes que utilizam o [Node.js](https://nodejs.org/) e separam responsabilidades utilizando o padrão MVC:

- [Aplicação Web (Front End) para listar, adicionar, editar e excluir Agricultores](./farmers-web/)
  - O principal framework utilizado é o [Angular](https://angular.io/).
- [API para operações CRUD realizadas no banco de Agricultores](./farmers-api/)
  - São utilizados o [Express](https://expressjs.com/) para tratamento de requisições HTTP e o [Sequelize](https://sequelize.org/) para ORM e gerenciamento de _migrations_.

---

# Execução

> **Obs.:** Além da execução que será explicada a seguir, é possível [executar as _migrations_](#migrações) e [executar os _seeders_](#seeders) para criar a estrutura inicial do banco com dados de amostra.

## Utilizando _Docker Compose_

É possível executar todas as aplicações que compõem o sistema utilizando o _Docker Compose_. Com o serviço do Docker em execução, basta rodar na linha de comando na raiz do repositório:

```console
$ docker-compose up
```

## Execução Individual

Alternativamente, é possível executar as aplicações individualmente em ambiente local, conforme as instruções a seguir.

### API

Antes de executar a API, é preciso que haja um serviço de banco de dados MySQL ativo para possibilitar a criação e o uso do banco com os dados dos agricultores. Caso necessário, altere as configurações de conexão com o banco local no arquivo [db.config.js](/farmers-api/config/db.config.js).

Com o banco já preparado, é preciso instalar as dependências da API e executá-la em seguida:

```console
$ cd farmers-api
$ npm ci
$ npm run dev
```

### Front End

Para iniciar o front end, é preciso primeiro instalar as dependências e em seguida executar o projeto:

```console
$ cd farmers-web
$ npm ci
$ npm run ng serve
```

# Migrações

O gerenciamento de _migrations_ de banco de dados é realizado por meio do Sequelize. Para executar as migrações, utilize este comando no diretório da API:

```console
$ npx sequelize-cli db:migrate
```

Há outros comandos possíveis utilizando o Sequelize CLI, como:

- `npx sequelize-cli migration:generate --name nome-da-migration`: gera uma nova _migration_ em [_/migrations_](./farmers-api/migrations/);
- `npx sequelize-cli db:migrate:undo`: desfaz a _migration_ mais recente.

# Seeders

Para inserir a qualquer momento dados de amostra no banco (desde que as _migrations_ já tenham executado), é possível rodar _seeders_ com o Sequelize CLI. Basta executar o seguinte comando no diretório da API:

```console
$ npx sequelize-cli db:seed:all
```

Assim como para [_migrations_], há outros comandos possíveis para gerenciar _seeders_, como:

- `npx sequelize-cli seed:generate --name nome-do-seeder`: gera uma um novo _seeder_ em [_/seeders_](./farmers-api/seeders/);
- `npx sequelize-cli db:seed:undo`: desfaz o _seeder_ mais recente.

# Testes Automatizados

## API

Utilize o seguinte comando no diretório da API:

```console
$ npm run test
```

Ou, para utilizar o modo _watch_:

```console
$ npm run test:watch
```

Os testes foram criados utilizando o [Jest](https://jestjs.io/). Assim, também é possível executar os testes diretamente com `npx jest` e outros parâmetros possíveis.

## Front End

Assim como para a API, utilize o comando a seguir, porém no diretório da aplicação front end:

```console
$ npm run test
```
