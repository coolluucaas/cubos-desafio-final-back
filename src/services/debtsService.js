const knex = require("../config/databaseConnection")

const listDebts = async () => {
    return knex
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
}


const insertDebt = async (nome_cliente, id_cliente, dadosCliente) => {
    cobrancaObj = {
            nome_cliente,
            id_cliente,
            ...dadosCliente,
        }

   

    return knex('cobrancas').insert(cobrancaObj)
}

module.exports = {
    listDebts,
    insertDebt
}