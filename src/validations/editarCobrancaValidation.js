const yup = require('../config/yup')

const schemaEditarCobranca = yup.object().shape({    
    nome_cliente: yup.string(),
    descricao: yup.string(),    
    valor: yup.number(),
    data_vencimento: yup.date(),   
    status: yup.string()
})

module.exports = schemaEditarCobranca
