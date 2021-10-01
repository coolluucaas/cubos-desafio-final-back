const express = require('express')
const logarUsuario = require('../controllers/login')
const { cadastrarUsuario, obterPerfil, atualizarPerfil } = require('../controllers/usuarios')
const verificadorLogin = require('../middlewares/loginMiddleware')
const validation = require('../middlewares/validationMiddleware')
const schemaAtualizarPerfil = require('../validations/atualizarPerfilValidation')
const schemaCadastrarUsuario = require('../validations/cadastrarUsuarioValidation')
const schemaLogin = require('../validations/loginValidation')

const routesUsuarios = express()

routesUsuarios.post('/',validation(schemaLogin), logarUsuario)
routesUsuarios.post('/usuario',validation(schemaCadastrarUsuario), cadastrarUsuario)

routesUsuarios.use(verificadorLogin)

routesUsuarios.get('/usuario', obterPerfil)
routesUsuarios.put('/usuario',validation(schemaAtualizarPerfil), atualizarPerfil)

module.exports = routesUsuarios
