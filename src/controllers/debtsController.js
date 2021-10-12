const knex = require('../config/databaseConnection')
const {
    findClientByName,
    findClientById,
} = require('../services/clientsService')
const {
    insertDebt,
    updateDebt,
    handleDebtUpdateInputs,
    listDebts,
} = require('../services/debtsService')

const listarCobrancas = async (req, res) => {
    try {
        const cobrancas = await listDebts()

        return res.status(200).json(cobrancas)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const cadastrarCobranca = async (req, res) => {
    const { nome_cliente, ...dadosCliente } = req.body

    const { id_cliente } = await findClientByName(nome_cliente)

    try {
        if (!(await findClientById(id_cliente))) {
            return res.status(400).json('Cliente não cadastrado.')
        }
        if (!(await insertDebt(id_cliente, nome_cliente, dadosCliente))) {
            return res.status(400).json('Cobranca não cadastrada.')
        }

        return res.status(200).json('Cobranca cadastrada com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const editarCobranca = async (req, res) => {
    const { id_cobranca } = req.params
    try {
        const inputs = await handleDebtUpdateInputs(req)

        if (!inputs.success) {
            return res.status(inputs.statusCode).json(inputs.message)
        }
        if (!(await updateDebt(inputs.cobrancaObj, id_cobranca))) {
            return res.status(400).json('Cobranca não atualizada')
        }

        return res.status(200).json('Cobranca atualizada com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const excluirCobranca = async (req, res) => {
    const { id_cobranca } = req.params
}

module.exports = {
    listarCobrancas,
    cadastrarCobranca,
    editarCobranca,
    excluirCobranca,
}
