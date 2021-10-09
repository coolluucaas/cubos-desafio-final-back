const knex = require('../config/databaseConnection')
const { findClient } = require('../services/clientsService')
const { insertDebt } = require('../services/debtsService')

const listarCobrancas = async (req, res) => {
    try {
        const cobrancas = await knex
            .select([
                'id as id_cobranca',
                'nome',
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
        const { id_cliente } = await findClient(nome_cliente)

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

module.exports = {
    listarCobrancas,
    cadastrarCobranca,
}
