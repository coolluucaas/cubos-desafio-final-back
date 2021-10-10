const express = require('express')
const { listarCobrancas, cadastrarCobranca, editarCobranca } = require('../controllers/debtsController')

const routesCobrancas = express()

routesCobrancas.get('/cobrancas', listarCobrancas)
routesCobrancas.post('/cobranca', cadastrarCobranca)
routesCobrancas.put('/cobranca/:id_cobranca', editarCobranca)

module.exports = routesCobrancas
