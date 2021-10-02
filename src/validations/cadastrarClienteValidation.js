const yup = require('../config/yup')

const schemaCadastrarCliente = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().required(),
    cpf: yup.string().min(14).max(14).required(),
    telefone: yup.string().min(15).max(15).required(),
    cep: yup.string().min(9).max(9),
    logradouro: yup.string(),
    complemento: yup.string(),
    pontoDeReferencia: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
})

module.exports = schemaCadastrarCliente
