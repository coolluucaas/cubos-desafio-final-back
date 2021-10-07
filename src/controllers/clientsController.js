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

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex.with(
            'tabela_de_inadimplencia',
            knex.select([
                'c.id',
                'nome',
                'email',
                'telefone',
                'd.valor',
                knex.raw(`(
                    CASE
                    WHEN d.data_pagamento IS NOT NULL THEN d.valor
                    ELSE 0
                    END
                   ) as valor_pago`),
                knex.raw(`( 
                    CASE 
                    WHEN d.data_pagamento IS NULL AND d.data_vencimento < NOW() THEN 0
                    ELSE 1
                    END
                    ) as status`),
            ]).from('clientes as c')
            .leftJoin('dividas as d','c.id', '=', 'd.cliente_id')
        ).select([
            'id', 
            'nome', 
            'email', 
            'telefone',
            knex.raw('sum(valor) as cobrancas_feitas'),
            knex.raw('sum(valor_pago) as conbrancas_recebidas'),
            knex.raw(`
            (
              CASE MIN(status)
              WHEN 0 THEN 'INADIMPLENTE'
              WHEN 1 THEN 'EM DIA'
              END
            ) as status`
        )]).from('tabela_de_inadimplencia')
        .groupBy(['id', 'nome', 'telefone', 'email'])

      
        return res.status(200).json(clientes)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    cadastrarClientes,
    listarClientes,
}
