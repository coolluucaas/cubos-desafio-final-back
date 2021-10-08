const yup = require('../config/yup')

const schemaCadastrarUsuario = yup.object().shape({
    nome_usuario: yup.string().required(),
    email_usuario: yup.string().required(),
    senha: yup.string().required().min(5),
})

module.exports = schemaCadastrarUsuario
