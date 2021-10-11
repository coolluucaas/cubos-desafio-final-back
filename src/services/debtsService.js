const knex = require('../config/databaseConnection')

const listDebts = async () => {
    return knex
        .select([
            '*',
            knex.raw(`( 
        CASE 
        WHEN status = 'PAGO' THEN 'PAGO'
        WHEN status = 'PENDENTE' AND data_vencimento<= NOW() THEN 'PENDENTE'
        WHEN status = 'PENDENTE' AND data_vencimento > NOW() THEN 'VENCIDO'                
        END
        ) as status2`),
        ])
        .from('cobrancas')
}

const insertDebt = async (nome_cliente, id_cliente, dadosCliente) => {
    cobrancaObj = {
        nome_cliente,
        id_cliente,
        ...dadosCliente,
    }

    return knex('cobrancas').insert(cobrancaObj)
}

const handleDebtUpdateInputs = async(   
    nome_cliente,
    descricao,
    data_vencimento,
    valor,
    status
) =>{
    const cobrancaObj = {}
    if (
        !nome_cliente &&
        !descricao &&
        !data_vencimento &&
        !valor &&
        !status        
    ) {
        return {
            success: false,
            statusCode: 404,
            message:
                'É obrigatório informar ao menos um campo para atualização',
        }
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

const updateDebt = async (cobrancaObj, id_cobranca) =>{
    return knex('cobrancas').update(cobrancaObj).where('id_cobranca', id_cobranca)
}

module.exports = {
    listDebts,
    insertDebt,
    handleDebtUpdateInputs,
    updateDebt
}
