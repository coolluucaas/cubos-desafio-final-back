const yup = require('../config/yup')

const schemaCadastrarCobranca = yup.object().shape({    
    nome_cliente: yup.string().required(),
    descricao: yup.string().required(),   
    status: yup.string().required(),
    valor: yup.number().required(),
    data_vencimento: yup.date().required()   
})

module.exports = schemaCadastrarCobranca
