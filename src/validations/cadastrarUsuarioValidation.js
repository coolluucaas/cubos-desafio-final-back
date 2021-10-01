const yup = require('../config/yup')

const schemaCadastrarUsuario = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().required(),
    senha: yup.string().required().min(5),
})

module.exports = schemaCadastrarUsuario
