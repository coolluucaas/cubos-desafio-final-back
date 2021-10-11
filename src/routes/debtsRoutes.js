const express = require('express')
const {
    listarCobrancas,
    cadastrarCobranca,
    editarCobranca,
} = require('../controllers/debtsController')
const validation = require('../middlewares/validationMiddleware')
const schemaCadastrarCobranca = require('../validations/cadastrarCobrancaValidation')
const schemaEditarCobranca = require('../validations/editarCobrancaValidation')

const routesCobrancas = express()

routesCobrancas.get('/cobrancas', listarCobrancas)
routesCobrancas.post(
    '/cobranca',
    validation(schemaCadastrarCobranca),
    cadastrarCobranca
)
routesCobrancas.put('/cobranca/:id_cobranca',validation(schemaEditarCobranca), editarCobranca)

module.exports = routesCobrancas
