const express = require('express')
const {
    cadastrarClientes,
    listarClientes,
    editarPerfilCliente,
} = require('../controllers/clientsController')
const validation = require('../middlewares/validationMiddleware')

const schemaEditarPerfilCliente = require('../validations/editarPerfilClienteValidation')

const routesClientes = express()

routesClientes.post(
    '/cliente',
    validation(schemaEditarPerfilUsuario),
    cadastrarClientes
)
routesClientes.get('/cliente', listarClientes)
routesClientes.put('/cliente', validation(schemaEditarPerfilCliente), editarPerfilCliente)

module.exports = routesClientes
