const jwt = require('jsonwebtoken')
const knex = require('../config/databaseConnection')

const verificadorLogin = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json('Não autorizado.')
    }

    try {
        const token = authorization.replace('Bearer ', '').trim()

        const { id_usuario } = jwt.verify(token, process.env.JWT_SENHA)        

        const usuarioCheck = await knex('usuarios').where('id_usuario', id_usuario).first()

        if (!usuarioCheck) {
            return res.status(404).json('Usuario não encontrado.')
        }

        const { senha, ...dadosUsuario } = usuarioCheck

        req.usuario = dadosUsuario        

        next()
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = verificadorLogin
