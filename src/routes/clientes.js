const express = require('express');
const cadastrarClientes = require('../controllers/clientes');
const verificadorLogin = require('../middlewares/loginMiddleware');
const validation = require('../middlewares/validationMiddleware');
const schemaCadastrarCliente = require('../validations/cadastrarClienteValidation');

const routesClientes = express();

routesClientes.use(verificadorLogin)

routesClientes.post('/cliente',validation(schemaCadastrarCliente), cadastrarClientes)

module.exports = routesClientes
