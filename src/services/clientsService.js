const knex = require("../config/databaseConnection")

const checkClient = async (email) => {
    return knex('clientes')
    .where('email_cliente', email)
    .first()
}

const insertClient = async (id_usuario, email_cliente, dadosCliente) => {
    const clienteObj = {
        id_usuario,
        email_cliente,
        ...dadosCliente,
    }

    return knex('clientes').insert(clienteObj)
}

module.exports = {
    checkClient,
    insertClient
}