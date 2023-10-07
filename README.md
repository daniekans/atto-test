Este projeto é composto por dois pacotes que utilizam o Node.js para separação de responsabilidades utilizando o padrão MVC:

- [Front End para listar, adicionar, editar e excluir Agricultores](./farmers-web/)
- [API para operações CRUD realizas no banco de Agricultores](./farmers-api/)

Para iniciar o front end, é preciso primeiro instalar as dependências e em seguida executar o projeto:

```sh
$ cd farmers-web
$ npm install
$ npm run ng serve
```

Para iniciar a API e o banco de dados, é necessário executar a aplicação utilizando o Docker Compose na raiz do repositório:

```sh
$ docker-compose up
```
