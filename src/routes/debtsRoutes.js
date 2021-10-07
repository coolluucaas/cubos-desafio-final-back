const express = require('express')
const { listarCobrancas } = require('../controllers/debtsController')

const routesCobrancas = express()

routesCobrancas.get('/cobrancas', listarCobrancas)

module.exports = routesCobrancas
