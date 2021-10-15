const express = require('express')
const {
    cadastrarClientes,
    listarClientes,
    editarPerfilCliente,
    contadorDeStatusDosClientes,
} = require('../controllers/clientsController')
const validation = require('../middlewares/validationMiddleware')
const schemaCadastrarCliente = require('../validations/cadastrarClienteValidation')
const schemaEditarPerfilCliente = require('../validations/editarPerfilClienteValidation')

const routesClientes = express()

routesClientes.post(
    '/cliente',
    validation(schemaCadastrarCliente),
    cadastrarClientes
)
routesClientes.get('/clientes', listarClientes)
routesClientes.put(
    '/cliente/:id_cliente',
    validation(schemaEditarPerfilCliente),
    editarPerfilCliente
)
routesClientes.get('/clientes/contador', contadorDeStatusDosClientes)

module.exports = routesClientes
