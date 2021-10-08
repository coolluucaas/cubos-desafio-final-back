const yup = require('../config/yup')

const schemaEditarPerfilCliente = yup.object().shape({
    nome: yup.string(),
    email: yup.string(),
    cpf: yup.string().min(14).max(14),
    telefone: yup.string().min(15).max(15),   
    cep: yup.string(),
    logradouro: yup.string(),
    complemento: yup.string(),
    pontoDeReferencia: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
})

module.exports = schemaEditarPerfilCliente
