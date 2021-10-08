const yup = require('../config/yup')

const schemaLogin = yup.object().shape({    
    email_usuario: yup.string().required(),
    senha: yup.string().required().min(5),
})

module.exports = schemaLogin
