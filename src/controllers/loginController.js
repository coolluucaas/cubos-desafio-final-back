const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('../config/databaseConnection')

const logarUsuario = async (req, res) => {
    const { email_usuario, senha } = req.body 

    try {
        const usuario = await knex('usuarios')
            .where('email_usuario', email_usuario)
            .first()

        if (!usuario) {
            return res.status(400).json('O usuario não foi encontrado')
        }

        const senhaVerificacao = await bcrypt.compare(
            senha,
            usuario.senha
        )

        if (!senhaVerificacao) {
            return res.status(400).json('Email ou senha incorretos.')
        }

        const token = jwt.sign(
            { id_usuario: usuario.id_usuario },
            process.env.JWT_SENHA,
            {
                expiresIn: '8h',
            }
        )

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
