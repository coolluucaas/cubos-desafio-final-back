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

module.exports = {
    checkEmailUser,
    insertUser,
    updateUser,
}
