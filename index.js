const express = require('express')
const uuid = require('uuid') //gerador de ID único atraves do npm
const port = 3000

const app = express ()
app.use(express.json())

const orders = []

const checkId = (request, response, next) => { 
  //middleware para checar se o id existe
  const { id } = request.params

  const index = orders.findIndex(element => element.id === id)

  if (index < 0) {
      return response.status(404).json({ error: "Order not found" })
  }

  request.orderIndex = index
  request.orderId = id

  next()
}

const checkRequest = (request, response, next) => { 
  //middleware para mostrar o metodo e url da requisição chamada
  const method = request.method

  const url = request.url

  console.log(`[${method}] - ${url} `)

  next()
}

//ROTA CADASTRAR NOVO PEDIDO - POST "new order"
app.post('/order', checkRequest, (request, response) =>{
  const { order, clientName, price } = request.body  //dados informados durante o POST no Insomnia

  const newOrder = { id: uuid.v4(), order, clientName, price, orderStatus: "Em preparação"}

  orders.push(newOrder) //para inserir o novo pedido no array de pedidos

  return response.status(201).json(newOrder) //retorna o novo pedido; status 201 = criado
})

//ROTA PARA LISTAR PEDIDOS - GET "list orders"
app.get('/order', checkRequest, (request, response) =>{
  return response.json(orders)
})

//ROTA PARA ALTERAR DADOS DO PEDIDO - PUT "change order"
app.put('/order/:id', checkRequest, checkId, (request, response) =>{
  const { order, clientName, price } = request.body
  const index = request.orderIndex
  const id = request.orderId

  const updatedOrder = { id, order, clientName, price, orderStatus:"Em preparação" }

  orders[index] = updatedOrder
  return response.json(updatedOrder)
})

//ROTA PARA EXCLUIR PEDIDO - DELETE "delete order"
app.delete('/order/:id', checkRequest, checkId, (request, response) =>{
  const index = request.orderIndex

  orders.splice(index,1)

  return response.status(204).json()
})

//ROTA PARA EXIBIR PEDIDO ESPECÍFICO - GET "list specific order"
app.get('/order/:id', checkRequest, checkId, (request, response) =>{
  const index = request.orderIndex

  const specificOrder = orders[index]

  return response.json(specificOrder)
})

//ROTA PARA ALTERAR STATUS DO PEDIDO PARA PRONTO -PATCH "change status"
app.patch('/order/:id', checkRequest, checkId, (request, response) =>{
  const index = request.orderIndex

  orders[index].status = "Pronto"

  return response.json(orders[index])
})

app.listen(port, () => {
  console.log(`💻Server started on port ${port}`)
})