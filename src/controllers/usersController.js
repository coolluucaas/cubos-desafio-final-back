const {
    updateUser,
    insertUser,
    handleUserUpdateInputs,
    handleUserRegisterInputs,
} = require('../services/usersService')

const cadastrarUsuario = async (req, res) => {
    const { nome_usuario, email_usuario, senha } = req.body

    try {
        const inputs = await handleUserRegisterInputs(            
            nome_usuario,
            email_usuario,
            senha
        )       

        if (!inputs.success) {
            return res.status(inputs.statusCode).json(inputs.message)
        }

        if (!(await insertUser(input.usuarioObj))) {
            return res.status(400).json('O usuário não foi cadastrado.')
        }

        return res.status(200).json('O usuario foi cadastrado com sucesso!')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const obterPerfil = async (req, res) => {
    return res.status(200).json(req.usuario)
}

const editarPerfilUsuario = async (req, res) => {
    const {
        nome_usuario,
        email_usuario,
        senha,
        cpf_usuario,
        telefone_usuario,
    } = req.body
    const {
        usuario: { id_usuario, email_usuario: email_cadastrado },
    } = req    

    try {
        const inputs = await handleUserUpdateInputs(
            nome_usuario,
            email_usuario,
            email_cadastrado,
            senha,
            cpf_usuario,
            telefone_usuario
        )

        if (!inputs.success) {
            res.status(inputs.status).json(inputs.message)
        }

        if (!(await updateUser(inputs.usuarioObj, id_usuario))) {
            return res
                .status(400)
                .json('O perfil do usuario não foi atualizado')
        }

        return res.status(200).json('Perfil do usuario atualizado com sucesso.')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = {
    cadastrarUsuario,
    obterPerfil,
    editarPerfilUsuario,
}
