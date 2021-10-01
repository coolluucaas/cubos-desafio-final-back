const yup = require('../config/yup')

const schemaAtualizarPerfil = yup.object().shape({
    nome: yup.string(),
    email: yup.string(),
    senha: yup.string().min(5),
    cpf: yup.string().min(11).max(11),
    telefone: yup.string().min(11).max(11)
})

module.exports = schemaAtualizarPerfil
