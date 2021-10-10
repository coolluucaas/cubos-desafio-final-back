const bcrypt = require('bcrypt')
const knex = require('../config/databaseConnection')

const checkEmailUser = async (email_usuario) => {
    return knex('usuarios').where('email_usuario', email_usuario).first()
}

const insertUser = async (nome_usuario, email_usuario, senhaCriptografada) => {
    const usuarioObj = {
        nome_usuario,
        email_usuario,
        senha: senhaCriptografada,
    }

    return await knex('usuarios').insert(usuarioObj)
}

const updateUser = async (usuarioObj, id_usuario) => {
    return knex('usuarios').update(usuarioObj).where('id_usuario', id_usuario)
}

const handleUserUpdateInputs = async (
    nome_usuario,
    email_usuario,
    email_cadastrado,
    senha,
    cpf_usuario,
    telefone_usuario,
    usuarioObj
    
) => {
    if (
        !nome_usuario &&
        !email_usuario &&
        !senha &&
        !cpf_usuario &&
        !telefone_usuario
    ) {
        return res
            .status(404)
            .json('É obrigatório informar ao menos um campo para atualização')
    }
    if (nome_usuario) {
        usuarioObj.nome_usuario = nome_usuario
    }
    if (email_usuario) {

        if (email_usuario !== email_cadastrado) {
            if (await checkEmailUser(email_usuario)) {
                return res
                    .status(400)
                    .json(
                        'Email indisponível. Por favor, insira outro endereço.'
                    )
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

    return usuarioObj
}

module.exports = {
    checkEmailUser,
    insertUser,
    updateUser,
    handleUserUpdateInputs,
}
