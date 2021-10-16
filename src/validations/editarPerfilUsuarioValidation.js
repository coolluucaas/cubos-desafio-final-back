const yup = require('../config/yup')

const schemaEditarPerfilUsuario = yup.object().shape({
    nome: yup.string(),
    email: yup.string(),
    senha: yup.string().min(5),
    isCpf: yup.boolean(),
    cpf_usuario: yup.string().when('isCpf', {
        is: true,
        then: yup.string().min(14).max(14),
        otherwise: yup.string()
    }),
    isTelefone: yup.boolean(),
    telefone_usuario: yup.string().when('isTelefone', {
        is: true,
        then: yup.string().min(15).max(15),
        otherwise: yup.string()
    })   
})

module.exports = schemaEditarPerfilUsuario
