const knex = require('../config/databaseConnection')
const { findClientByName } = require('../services/clientsService')
const { insertDebt, updateDebt, handleDebtUpdateInputs } = require('../services/debtsService')

const listarCobrancas = async (req, res) => {
    try {
        const cobrancas = await knex
            .select([
                'id_cliente',
                'nome_',
                'descricao',
                'valor',
                knex.raw(`( 
                    CASE 
                    WHEN esta_pago IS TRUE THEN 'PAGO'
                    WHEN esta_pago IS FALSE AND data_vencimento< NOW() THEN 'PENDENTE'  
                    ELSE 'VENCIDO'
                    END
                    ) as status`),
            ])
            .from('cobrancas')

        return res.status(200).json(cobrancas)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const cadastrarCobranca = async (req, res) => {
    const { nome_cliente, ...dadosCliente } = req.body
    let cobrancaObj = {}

    try {
        const { id_cliente } = await findClientByName(nome_cliente)

        if (!id_cliente) {
            return res.status(400).json('Cliente não cadastrado.')
        }
        if (!(await insertDebt(nome_cliente, id_cliente, dadosCliente))) {
            return res.status(400).json('Cobranca não cadastrada.')
        }

        return res.status(200).json('Cobranca cadastrada com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const editarCobranca = async (req, res) => {
    const { nome_cliente, descricao, data_vencimento, valor, status } = req.body
    const { id_cobranca } = req.params
    try {
        const inputs = await handleDebtUpdateInputs(
            nome_cliente,
            descricao,
            data_vencimento,
            valor,
            status
        )

        if (!inputs.success) {
            res.status(inputs.status).json(inputs.message)
        }
        if (!(await updateDebt(inputs.cobrancaObj, id_cobranca))) {
            return res.status(400).json('Cobranca não atualizada')
        }

        return res.status(200).json('Cobranca atualizada com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    listarCobrancas,
    cadastrarCobranca,
    editarCobranca,
}
