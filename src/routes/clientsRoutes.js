const express = require('express')
const cadastrarClientes = require('../controllers/clientsController')
const validation = require('../middlewares/validationMiddleware')
const schemaCadastrarCliente = require('../validations/cadastrarClienteValidation')

const routesClientes = express()

routesClientes.post(
    '/cliente',
    validation(schemaCadastrarCliente),
    cadastrarClientes
)

module.exports = routesClientes
