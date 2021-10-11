const {
    insertClient,
    listClients,
    updateClient,
    findClientByEmail,
    findClientById,
    handleClientUpdateInputs,
} = require('../services/clientsService')
const { listDebts } = require('../services/debtsService')

const cadastrarClientes = async (req, res) => {
    const { email_cliente, ...dadosCliente } = req.body
    const { id_usuario } = req.usuario

    try {
        if (await findClientByEmail(email_cliente)) {
            return res
                .status(400)
                .json(
                    'O email já foi cadastro, por favor insira um email diferente.'
                )
        }

        if (!(await insertClient(id_usuario, email_cliente, dadosCliente))) {
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
    const {        
        nome_cliente,
        email_cliente,
        cpf_cliente,
        telefone_cliente,
        cep,
        logradouro,
        complemento,
        referencia,
        bairro,
        cidade,
    } = req.body

    const { id_cliente } = req.params

    try {
        const inputs = await handleClientUpdateInputs(            
            id_cliente,
            nome_cliente,
            email_cliente,
            cpf_cliente,
            telefone_cliente,
            cep,
            logradouro,
            complemento,
            referencia,
            bairro,
            cidade
        )

        if (!inputs.success) {
            res.status(inputs.status).json(inputs.message)
        }

        if (!(await updateClient(inputs.clienteObj, id_cliente))) {
            return res
                .status(400)
                .json('Perfil do cliente não foi atualizado.')
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
