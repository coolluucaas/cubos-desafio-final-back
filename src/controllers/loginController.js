const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('../config/databaseConextion')

const logarUsuario = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await knex('usuarios').where('email', email).first()

        if (!usuario) {
            return res.status(400).json('O usuario não foi encontrado')
        }

        const senhaVerificacao = await bcrypt.compare(senha, usuario.senha)

        if (!senhaVerificacao) {
            return res.status(400).json('Email e senha não confere')
        }

        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SENHA, {
            expiresIn: '8h',
        })

        const { senha: senhaUsuario, ...dadosUsuario } = usuario

        return res.status(200).json({
            usuario: dadosUsuario,
            token,
        })
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = logarUsuario
