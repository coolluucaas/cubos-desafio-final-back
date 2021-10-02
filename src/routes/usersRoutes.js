const express = require('express')
const logarUsuario = require('../controllers/loginController')
const { cadastrarUsuario, obterPerfil, atualizarPerfil } = require('../controllers/usersController')
const verificadorLogin = require('../middlewares/authMiddleware')
const validation = require('../middlewares/validationMiddleware')
const schemaAtualizarPerfilUsuario = require('../validations/atualizarPerfilUsuarioValidation')
const schemaCadastrarUsuario = require('../validations/cadastrarUsuarioValidation')
const schemaLogin = require('../validations/loginValidation')

const routesUsuarios = express()

routesUsuarios.post('/',validation(schemaLogin), logarUsuario)
routesUsuarios.post('/usuario',validation(schemaCadastrarUsuario), cadastrarUsuario)

routesUsuarios.use(verificadorLogin)

routesUsuarios.get('/usuario', obterPerfil)
routesUsuarios.put('/usuario',validation(schemaAtualizarPerfilUsuario), atualizarPerfil)

module.exports = routesUsuarios
