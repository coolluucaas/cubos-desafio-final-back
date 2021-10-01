const yup = require('../config/yup')

const schemaCadastrarCliente = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().required(),
    cpf: yup.number().required(),
    telefone: yup.number().required(),
    cep: yup.string(),
    logradouro: yup.string(),
    complemento: yup.string(),
    pontoDeReferencia: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
})

module.exports = schemaCadastrarCliente
