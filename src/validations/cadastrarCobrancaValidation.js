const yup = require('../config/yup')

const schemaCadastrarCobrança = yup.object().shape({    
    nome_cliente: yup.string().required(),
    descricao: yup.string().required(),
    email_cliente: yup.string().required(),
    esta_pago: yup.boolean().required(),
    valor: yup.number().required(),
    vencimento: yup.date().required()   
})

module.exports = schemaCadastrarCobrança
