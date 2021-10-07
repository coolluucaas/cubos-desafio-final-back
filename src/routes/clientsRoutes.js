const express = require('express')
const {
    cadastrarClientes,
    listarClientes,
} = require('../controllers/clientsController')
const validation = require('../middlewares/validationMiddleware')
const schemaCadastrarCliente = require('../validations/cadastrarClienteValidation')

const routesClientes = express()

routesClientes.post(
    '/cliente',
    validation(schemaCadastrarCliente),
    cadastrarClientes
)
routesClientes.get('/cliente', listarClientes)

module.exports = routesClientes
