# Pedidos Hamburgueria

Desafio do curso DevClub para criar uma aplicação que faça cadastro dos pedidos de uma hamburgueria, usando [Node](https://nodejs.org/en/) e [Express](https://expressjs.com/pt-br/).

## Recursos utilizados:

- Node.JS na versão 18.14.0 em LTS.

- NPM na versão 9.3.1

- Insomnia (testar requisições das rotas)

- Framework Express
`npm i express`

- Biblioteca uuid
`npm i uuid`

- Nodemon
`npm i nodemon` (usado durante o desenvolvimento da aplicação)

## Métodos HTTP

- `POST /order`: Cria um pedido usando as informações enviadas dentro do arquivo `request body`: order, clientName, price e adiciona um id e orderStatus.

- `GET /order`: Retorna uma lista de todos os pedidos já feitos.

- `PUT /order/:id`: Atualiza um pedido específico, com base no id. Pode alterar, um ou todos os dados do pedido por meio do `body` e retorna o pedido alterado.

- `DELETE /order/:id`: Deleta um pedido específico, com base no id.

- `GET /order/:id`: Retorna um pedido específico, com base no id.

- `PATCH /order/:id`: Altera o status de um pedido específico, com base no id, para "Pronto".

## Referência

 - [Descrição completa dos requisitos do desafio](https://github.com/rodolfomori/desafio-node-1/tree/master)