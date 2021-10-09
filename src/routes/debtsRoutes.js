const express = require('express')
const { listarCobrancas, cadastrarCobranca } = require('../controllers/debtsController')

const routesCobrancas = express()

routesCobrancas.get('/cobrancas', listarCobrancas)
routesCobrancas.post('/cobranca', cadastrarCobranca)

module.exports = routesCobrancas
