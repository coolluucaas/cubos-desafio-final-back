const bcrypt = require('bcrypt')
const knex = require('../config/databaseConnection')

const findUserById = async (email_usuario) => {
    return knex('usuarios').where('email_usuario', email_usuario).first()
}

const insertUser = async (usuarioObj) => {
    return await knex('usuarios').insert(usuarioObj)
}

const updateUser = async (usuarioObj, id_usuario) => {
    return knex('usuarios').update(usuarioObj).where('id_usuario', id_usuario)
}

const handleUserRegisterInputs = async (
    // usuarioObj,
    nome_usuario,
    email_usuario,
    senha  
) => {
    const usuarioObj = {}

    usuarioObj.nome_usuario = nome_usuario

    if (await findUserById(email_usuario)) {
        return { 
            success: false,
            statusCode: 400,
            message:'Email indisponível. Por favor, insira outro endereço.'
        }            
    }

    usuarioObj.email_usuario = email_usuario
    usuarioObj.senha = await bcrypt.hash(senha, 10)

    return { 
        success: true,
        usuarioObj 
    }
}

const handleUserUpdateInputs = async (
    nome_usuario,
    email_usuario,
    email_cadastrado,
    senha,
    cpf_usuario,
    telefone_usuario
) => {

    const usuarioObj = {}
    if (
        !nome_usuario &&
        !email_usuario &&
        !senha &&
        !cpf_usuario &&
        !telefone_usuario
    ) {
        return { 
            success: false,
            statusCode: 404,
            message:'É obrigatório informar ao menos um campo para atualização'
        }  
    }
    if (nome_usuario) {
        usuarioObj.nome_usuario = nome_usuario
    }
    if (email_usuario) {
        if (email_usuario !== email_cadastrado) {
            if (await findUserById(email_usuario)) {
                return { 
                    success: false,
                    statusCode: 400,
                    message:'Email indisponível. Por favor, insira outro endereço.'
                }              
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

    return { 
        success: true,
        usuarioObj 
    }
}

module.exports = {
    findUserById,
    insertUser,
    updateUser,
    handleUserUpdateInputs,
    handleUserRegisterInputs,
}
