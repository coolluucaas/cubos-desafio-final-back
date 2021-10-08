const yup = require('../config/yup')

const schemaEditarPerfilUsuario = yup.object().shape({
    nome: yup.string(),
    email: yup.string(),
    senha: yup.string().min(5),
    cpf_usuario: yup.string().min(14).max(14),
    telefone_usuario: yup.string().min(15).max(15)
})

module.exports = schemaEditarPerfilUsuario
