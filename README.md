# Descrição

Este é um sistema para listar, adicionar, editar e excluir cadastros de agricultores.

O projeto é composto por dois pacotes que utilizam o [Node.js](https://nodejs.org/) e separam responsabilidades utilizando o padrão MVC:

- [Aplicação Web para listar, adicionar, editar e excluir Agricultores](./farmers-web/)
  - O principal framework utilizado é o [Angular](https://angular.io/).
- [API para operações CRUD realizadas no banco de Agricultores](./farmers-api/)
  - São utilizados o [Express](https://expressjs.com/) para tratamento de requisições HTTP e o [Sequelize](https://sequelize.org/) para ORM e gerenciamento de _migrations_.

---

# Execução

## Utilizando _Docker Compose_

É possível executar todas as aplicações que compõem o sistema utilizando o _Docker Compose_. Com o serviço do Docker em execução, basta rodar na linha de comando na raiz do repositório:

```sh
$ docker-compose up
```

## Execução Individual

Alternativamente, é possível executar as aplicações individualmente em ambiente local, conforme as instruções a seguir.

### API

Antes de executar a API, é preciso que haja um serviço de banco de dados MySQL ativo para possibilitar a criação e o uso do banco com os dados dos agricultores. Caso necessário, altere as configurações de conexão com o banco local no arquivo [db.config.ts](/farmers-api/config/db.config.ts).

Com o banco já preparado, é preciso instalar as dependências da API e executá-la em seguida:

```sh
$ cd farmers-api
$ npm ci
$ npm run dev
```

### Aplicação Web

Para iniciar o front end, é preciso primeiro instalar as dependências e em seguida executar o projeto:

```sh
$ cd farmers-web
$ npm ci
$ npm run ng serve
```
