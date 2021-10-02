const yup = require('../config/yup')

const schemaAtualizarPerfilUsuarioUsuario = yup.object().shape({
    nome: yup.string(),
    email: yup.string(),
    senha: yup.string().min(5),
    cpf: yup.string().min(14).max(14),
    telefone: yup.string().min(15).max(15)
})

module.exports = schemaAtualizarPerfilUsuarioUsuario
