const knex = require('../config/databaseConnection')

const cadastrarClientes = async (req, res) => {
    const { email, ...dadosCliente } = req.body
    const { id: usuario_id } = req.usuario

    try {
        const clienteCheck = await knex('clientes')
            .where('email', email)
            .first()

        if (clienteCheck) {
            return res
                .status(400)
                .json(
                    'O email já foi cadastro, por favor insira um email diferente.'
                )
        }        

        const clienteObj = {
            usuario_id,           
            email,           
            ...dadosCliente,
        }

        const cliente = await knex('clientes').insert(clienteObj)

        if (!cliente) {
            return res.status(400).json('O cliente não foi cadastrado.')
        }

        return res.status(200).json('O cliente foi cadastrado com sucesso!')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = cadastrarClientes
