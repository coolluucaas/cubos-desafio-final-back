const {
    insertClient,
    listClients,
    updateClient,
    handleClientUpdateInputs,
    handleClientRegisterInputs,
} = require('../services/clientsService')
const { listDebts } = require('../services/debtsService')

const cadastrarClientes = async (req, res) => {
    try {
        const inputs = await handleClientRegisterInputs(req)

        if (!inputs.success) {
            return res.status(inputs.statusCode).json(inputs.message)
        }
        if (!(await insertClient(inputs.clienteObj))) {
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
    const { id_cliente } = req.params

    try {
        const inputs = await handleClientUpdateInputs(req)

        if (!inputs.success) {
            return res.status(inputs.statusCode).json(inputs.message)
        }
        if (!(await updateClient(inputs.clienteObj, id_cliente))) {
            return res.status(400).json('Perfil do cliente não foi atualizado.')
        }

        return res.status(200).json('Perfil do cliente atualizado com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    cadastrarClientes,
    listarClientes,
    editarPerfilCliente,
}
