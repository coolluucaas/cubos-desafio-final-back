const knex = require("../config/databaseConnection")

const checkUser = async (email_usuario) => {
    return knex('usuarios')
    .where('email_usuario', email_usuario)
    .first()
}

const updateUser = async (usuarioObj, id_usuario) => {
    return knex('usuarios')
    .update(usuarioObj)
    .where('id_usuario', id_usuario)
} 

module.exports = {
    checkUser,
    updateUser
}