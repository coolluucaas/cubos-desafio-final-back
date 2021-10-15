const {
    insertClient,
    listClients,
    updateClient,
    handleClientUpdateInputs,
    handleClientRegisterInputs,
    counterClientsStatus,
} = require('../services/clientsService')
const {
    listDebtsAsComponentOfClientDetail,
} = require('../services/debtsService')

const listarClientes = async (req, res) => {
    try {
        const clientes = await listClients()
        const cobrancas = await listDebtsAsComponentOfClientDetail()

        for (const cliente of clientes) {
            cliente.cobrancas = []
            for (const cobranca of cobrancas) {
                const { id_cliente, ...dadosCobranca } = cobranca

                if (cliente.id_cliente === cobranca.id_cliente) {
                    cliente.cobrancas.push(dadosCobranca)
                }
            }
            if (cliente.cobrancas.length === 0) {
                cliente.status_cliente = 'EM DIA'
            }
        }

        return res.status(200).json(clientes)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const contadorDeStatusDosClientes = async (req, res) => {
    try {
        const contagem = await counterClientsStatus()

        return res.status(200).json(contagem)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

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

const editarPerfilCliente = async (req, res) => {
    try {
        const inputs = await handleClientUpdateInputs(req)

        if (!inputs.success) {
            return res.status(inputs.statusCode).json(inputs.message)
        }
        if (!(await updateClient(inputs.clienteObj))) {
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
    contadorDeStatusDosClientes,
}
