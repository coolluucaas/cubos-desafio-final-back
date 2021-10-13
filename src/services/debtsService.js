const knex = require('../config/databaseConnection')

const findDebtById = (id_cobranca) => {
    return knex('cobrancas').where('id_cobranca', id_cobranca).first()
}

const listDebtsAsComponentOfClientDetail = async () => {
    return knex
        .select([
            'id_cobranca',
            'id_cliente',
            'nome_cliente',
            'descricao',
            'data_vencimento',
            'valor',
            knex.raw(`( 
        CASE 
        WHEN status = 'PAGO' THEN 'PAGO'
        WHEN status = 'PENDENTE' AND data_vencimento < CURRENT_DATE THEN 'VENCIDO' 
        WHEN status = 'PENDENTE' AND data_vencimento >= CURRENT_DATE THEN 'PENDENTE'             
        END
        ) as status_cobranca`),
        ])
        .from('cobrancas')
}

const listDebts = async () => {
    return knex
        .select([
            'id_cobranca',
            'id_cliente',
            'nome_cliente',
            'descricao',
            'data_vencimento',
            'valor',
            'status',
            knex.raw(`( 
        CASE 
        WHEN status = 'PAGO' THEN 'PAGO'
        WHEN status = 'PENDENTE' AND data_vencimento < CURRENT_DATE THEN 'VENCIDO' 
        WHEN status = 'PENDENTE' AND data_vencimento >= CURRENT_DATE THEN 'PENDENTE'             
        END
        ) as status_cobranca`),
        ])
        .from('cobrancas')
}

const insertDebt = async (id_cliente, nome_cliente, dadosCliente) => {
    const cobrancaObj = {
        id_cliente,
        nome_cliente,
        ...dadosCliente,
    }

    return knex('cobrancas').insert(cobrancaObj)
}

const handleDebtUpdateInputs = async (req) => {
    const { nome_cliente, descricao, data_vencimento, valor, status } = req.body
    const { id_cobranca } = req.params

    const cobrancaObj = {}

    if (!nome_cliente && !descricao && !data_vencimento && !valor && !status) {
        return {
            success: false,
            statusCode: 404,
            message:
                'É obrigatório informar ao menos um campo para atualização',
        }
    }
    if (id_cobranca) {
        if (!(await findDebtById(id_cobranca))) {
            return {
                success: false,
                statusCode: 400,
                message:
                    'Não há cobrança cadastrado com o id informado. Por favor, insira um id válido.',
            }
        }
        cobrancaObj.id_cobranca = id_cobranca
    }

    if (nome_cliente) {
        cobrancaObj.nome_cliente = nome_cliente
    }
    if (descricao) {
        cobrancaObj.descricao = descricao
    }
    if (data_vencimento) {
        cobrancaObj.data_vencimento = data_vencimento
    }
    if (valor) {
        cobrancaObj.valor = valor
    }

    return {
        success: true,
        cobrancaObj,
    }
}

const updateDebt = async (cobrancaObj) => {
    return knex('cobrancas')
        .update(cobrancaObj)
        .where('id_cobranca', cobrancaObj.id_cobranca)
}

module.exports = {
    listDebts,
    listDebtsAsComponentOfClientDetail,
    insertDebt,
    handleDebtUpdateInputs,
    updateDebt,
}
