const knex = require('../config/databaseConnection')

const listarCobrancas= async (req, res) => {
    try {
        const cobrancas = await knex.select([
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
                    ) as status`)              
            ]).from('cobrancas')

        return res.status(200).json(cobrancas)
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {    
    listarCobrancas
}
