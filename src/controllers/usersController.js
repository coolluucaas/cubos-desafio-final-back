const knex = require('../config/databaseConnection')
const bcrypt = require('bcrypt')

const cadastrarUsuario = async (req, res) => {
    const { nome_usuario, email_usuario, senha } = req.body

    try {
        const emailCheck = await knex('usuarios')
            .where('email_usuario', email_usuario)
            .first()

        if (emailCheck) {
            return res.status(400).json('Email indisponível. Por favor, insira outro endereço.')
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuarioObj = { nome_usuario, email_usuario, senha: senhaCriptografada }

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
    const { nome_usuario, email_usuario, senha, cpf_usuario, telefone_usuario } = req.body
    const { usuario } = req

    if (!nome_usuario && !email_usuario && !senha && !cpf_usuario && !telefone_usuario) {
        return res
            .status(404)
            .json('É obrigatório informar ao menos um campo para atualização')
    }

    try {
        const usuarioObj = {}

        if (nome_usuario) {
            usuarioObj.nome_usuario = nome_usuario
        }

        if (email_usuario) {
            if (email_usuario !== req.usuario.email_usuario) {
                emailCheck = await knex('usuarios')
                    .where('email_usuario', email_usuario)
                    .first()

                if (emailCheck) {
                    return res.status(400).json('Email indisponível. Por favor, insira outro endereço.')
                }
            }

            usuarioObj.email_usuario = email_usuario
        }

        if (senha) {
            usuarioObj.senha = await bcrypt.hash(senha, 10)
        }

        if (cpf_usuario) {
            usuarioObj.cpf_usuario = cpf_usuario
        }

        if (telefone_usuario) {
            usuarioObj.telefone_usuario = telefone_usuario
        }        

        const usuarioAtualizado = await knex('usuarios')
            .update(usuarioObj)
            .where('id_usuario', usuario.id_usuario)

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
