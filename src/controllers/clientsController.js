const knex = require('../config/databaseConnection')
const { checkClient, insertClient, listClients } = require('../services/clientsService')
const { listDebts } = require('../services/debtsService')

const cadastrarClientes = async (req, res) => {
    const { email_cliente, ...dadosCliente } = req.body
    const { id_usuario } = req.usuario

    try {
        if (await checkClient(email_cliente)) {
            return res
                .status(400)
                .json(
                    'O email já foi cadastro, por favor insira um email diferente.'
                )
        }

        if (!insertClient(id_usuario, email_cliente, dadosCliente)) {
            return res.status(400).json('O cliente não foi cadastrado.')
        }

        return res.status(200).json('O cliente foi cadastrado com sucesso!')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const listarClientes = async (req, res) => {
    try {
        const clientes = await listClients()

        const cobrancas = await listDebts()

        for (const cliente of clientes) {
            cliente.cobrancas = []
            for (const cobranca of cobrancas) {
                const { id_cliente, ...dadosCobranca } = cobranca

                if (cliente.id_cliente === cobranca.id_cliente) {
                    cliente.cobrancas.push(dadosCobranca)
                }
            }
        }

        return res.status(200).json(clientes)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const editarPerfilCliente = async (req, res) => {
    return res.json('() [] {}')
}

module.exports = {
    cadastrarClientes,
    listarClientes,
    editarPerfilCliente,
}
