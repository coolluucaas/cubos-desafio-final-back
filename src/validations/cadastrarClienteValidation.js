const yup = require('../config/yup')

const schemaCadastrarCliente = yup.object().shape({
    nome_cliente: yup.string().required(),
    email_cliente: yup.string().required(),
    cpf_cliente: yup.string().min(14).max(14).required(),
    telefone_cliente: yup.string().min(15).max(15).required(),   
    cep: yup.string(),
    logradouro: yup.string(),
    complemento: yup.string(),
    referencia: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
})

module.exports = schemaCadastrarCliente
