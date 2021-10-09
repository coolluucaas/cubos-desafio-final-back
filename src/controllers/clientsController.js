const knex = require('../config/databaseConnection')
const { checkClient, insertClient } = require('../services/clientsService')

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
        const clientes = await knex
            .with(
                'tabela_de_inadimplencia',
                knex
                    .select([
                        'c.*',
                        'd.valor',
                        knex.raw(`(
                    CASE
                    WHEN d.esta_pago IS TRUE THEN d.valor
                    ELSE 0
                    END
                   ) as valor_pago`),
                        knex.raw(`( 
                    CASE 
                    WHEN d.esta_pago IS FALSE AND d.data_vencimento < NOW() THEN 0
                    ELSE 1
                    END
                    ) as status`),
                    ])
                    .from('clientes as c')
                    .leftJoin(
                        'cobrancas as d',
                        'c.id_cliente',
                        '=',
                        'd.id_cliente'
                    )
            )
            .select([
                'id_cliente',
                'nome_cliente',
                'email_cliente',
                'telefone_cliente',
                'cpf_cliente',
                'cep',
                'logradouro',
                'complemento',
                'referencia',
                'bairro',
                'cidade',
                knex.raw('sum(valor) as cobrancas_feitas'),
                knex.raw('sum(valor_pago) as cobrancas_recebidas'),
                knex.raw(`
            (
              CASE MIN(status)
              WHEN 0 THEN 'INADIMPLENTE'
              WHEN 1 THEN 'EM DIA'
              END
            ) as status`),
            ])
            .from('tabela_de_inadimplencia')
            .groupBy([
                'id_cliente',
                'nome_cliente',
                'email_cliente',
                'telefone_cliente',
                'cpf_cliente',
                'cep',
                'logradouro',
                'complemento',
                'referencia',
                'bairro',
                'cidade',
            ])
            .orderBy('id_cliente')

        const cobrancas = await knex
            .select([
                '*',
                knex.raw(`( 
                CASE 
                WHEN esta_pago IS TRUE THEN 'PAGO'
                WHEN esta_pago IS FALSE AND data_vencimento<= NOW() THEN 'PENDENTE'
                WHEN esta_pago IS FALSE AND data_vencimento > NOW() THEN 'VENCIDO'                
                END
                ) as status`),
            ])
            .from('cobrancas')

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
