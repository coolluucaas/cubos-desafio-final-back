const knex = require('../config/databaseConnection')
const {
    insertClient,
    listClients,
    updateClient,
    checkEmailClient,
} = require('../services/clientsService')
const { listDebts } = require('../services/debtsService')

const cadastrarClientes = async (req, res) => {
    const { email_cliente, ...dadosCliente } = req.body
    const { id_usuario } = req.usuario

    try {
        if (await checkEmailClient(email_cliente)) {
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
        id_usuario,
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

    const { email_cliente: email_cadastrado } = await knex('clientes')
        .where('id_cliente', id_cliente)
        .first()

    if (
        !id_usuario &&
        !nome_cliente &&
        !email_cliente &&
        !cpf_cliente &&
        !telefone_cliente &&
        !cep &&
        !logradouro &&
        !complemento &&
        !referencia &&
        !bairro &&
        !cidade
    ) {
        return res
            .status(404)
            .json('É obrigatório informar ao menos um campo para atualização')
    }

    try {
        const clienteObj = {}

        if (nome_cliente) {
            clienteObj.nome_cliente = nome_cliente
        }
        if (email_cliente) {
            if (email_cliente !== email_cadastrado) {
                if (await checkEmailClient(email_cliente)) {
                    return res
                        .status(400)
                        .json(
                            'Email indisponível. Por favor, insira outro endereço.'
                        )
                }
                clienteObj.email_cliente = email_cliente
            }
        }
        if (cpf_cliente) {
            clienteObj.cpf_cliente = cpf_cliente
        }
        if (telefone_cliente) {
            clienteObj.telefone_cliente = telefone_cliente
        }
        if (cep) {
            clienteObj.cep = cep
        }
        if (logradouro) {
            clienteObj.logradouro = logradouro
        }
        if (complemento) {
            clienteObj.complemento = complemento
        }
        if (referencia) {
            clienteObj.referencia = referencia
        }
        if (bairro) {
            clienteObj.bairro = bairro
        }
        if (cidade) {
            clienteObj.cidade = cidade
        }
        if (!(await updateClient(clienteObj, id_cliente))) {
            return res
                .status(400)
                .json('O perfil do usuario não foi atualizado')
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
