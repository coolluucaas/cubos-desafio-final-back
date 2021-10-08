const express = require('express')
const logarUsuario = require('../controllers/loginController')
const { cadastrarUsuario, obterPerfil, editarPerfilUsuario } = require('../controllers/usersController')
const verificadorLogin = require('../middlewares/authMiddleware')
const validation = require('../middlewares/validationMiddleware')
const schemaeditarPerfilUsuarioUsuario = require('../validations/editarPerfilUsuarioUsuarioValidation')
const schemaCadastrarUsuario = require('../validations/cadastrarUsuarioValidation')
const schemaLogin = require('../validations/loginValidation')
const schemaEditarPerfilUsuario = require('../validations/atualizarPerfilUsuarioValidation')

const routesUsuarios = express()

routesUsuarios.post('/',validation(schemaLogin), logarUsuario)
routesUsuarios.post('/usuario',validation(schemaCadastrarUsuario), cadastrarUsuario)

routesUsuarios.use(verificadorLogin)

routesUsuarios.get('/usuario', obterPerfil)
routesUsuarios.put('/usuario',validation(schemaEditarPerfilUsuario), editarPerfilUsuario)

module.exports = routesUsuarios
