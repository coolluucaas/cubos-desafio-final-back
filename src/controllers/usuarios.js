const knex = require('../config/databaseConextion')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const usuarioCheck = await knex('usuarios')
            .where('email', email)
            .first()

        if (usuarioCheck) {
            return res.status(400).json('O email já existe')
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuarioObj = { nome, email, senha: senhaCriptografada }

        const usuario = await knex('usuarios').insert(usuarioObj)

        if (!usuario) {
            return res.status(400).json('O usuário não foi cadastrado.')
        }

        return res.status(200).json('O usuario foi cadastrado com sucesso!')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const obterPerfil = async (req, res) => {
    return res.status(200).json(req.usuario)
}

const atualizarPerfil = async (req, res) => {
    const { nome, email, senha, cpf, telefone } = req.body
    const { usuario } = req

    if (!nome && !email && !senha && !cpf && !telefone) {
        return res
            .status(404)
            .json('É obrigatório informar ao menos um campo para atualização')
    }

    try {
        const usuarioObj = {}

        if (nome) {
            usuarioObj.nome = nome
        }

        if (email) {
            if (email !== req.usuario.email) {
                emailCheck = await knex('usuarios')
                    .where('email', email)
                    .first()

                if (emailCheck) {
                    return res.status(400).json('O email já existe')
                }
            }

            usuarioObj.email = email
        }

        if (senha) {
            usuarioObj.senha = await bcrypt.hash(senha, 10)
        }

        if (cpf) {
            usuarioObj.cpf = cpf
        }

        if (telefone) {
            usuarioObj.telefone = telefone
        }

        const usuarioAtualizado = await knex('usuarios')
            .update(usuarioObj)
            .where('id', usuario.id)

        if (!usuarioAtualizado) {
            return res
                .status(400)
                .json('O perfil do usuario não foi atualizado')
        }

        return res.status(200).json('Perfil do usuario atualizado com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    cadastrarUsuario,
    obterPerfil,
    atualizarPerfil,
}
