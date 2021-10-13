const {
    findClientByName,
    findClientById,
} = require('../services/clientsService')
const {
    insertDebt,
    updateDebt,
    handleDebtUpdateInputs,
    listDebts,
    findDebtById,
    handleDebtDeleteInput,
    deleteDebt,
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
            return res.status(400).json('Cobrança não cadastrada.')
        }

        return res.status(200).json('Cobrança cadastrada com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const editarCobranca = async (req, res) => {
    try {
        const inputs = await handleDebtUpdateInputs(req)

        if (!inputs.success) {
            return res.status(inputs.statusCode).json(inputs.message)
        }
        if (!(await updateDebt(inputs.cobrancaObj))) {
            return res.status(400).json('Cobrança não atualizada.')
        }

        return res.status(200).json('Cobrança atualizada com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const excluirCobranca = async (req, res) => {
    try {
        const input = await handleDebtDeleteInput(req)
        if (!input.success) {
            return res.status(input.statusCode).json(input.message)
        }

        if (!(await deleteDebt(input.id_cobranca))) {
            return res.status(400).json('Cobrança não excluída.')
        }

        return res.status(200).json('Cobrança excluída com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    listarCobrancas,
    cadastrarCobranca,
    editarCobranca,
    excluirCobranca,
}
