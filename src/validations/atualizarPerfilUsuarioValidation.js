const yup = require('../config/yup')

const schemaAtualizarPerfilUsuario = yup.object().shape({
    nome_usuario: yup.string(),
    email_usuario: yup.string(),
    senha: yup.string().min(5),
    cpf_usuario: yup.string().min(14).max(14),
    telefone_usuario: yup.string().min(15).max(15)
})

module.exports = schemaAtualizarPerfilUsuario
