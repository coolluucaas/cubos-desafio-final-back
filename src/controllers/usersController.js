const bcrypt = require('bcrypt')
const { updateUser, checkEmailUser, insertUser } = require('../services/usersService')

const cadastrarUsuario = async (req, res) => {
    const { nome_usuario, email_usuario, senha } = req.body

    try {
        if (await checkEmailUser(email_usuario)) {
            return res
                .status(400)
                .json('Email indisponível. Por favor, insira outro endereço.')
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        if (
            !(await insertUser(                
                nome_usuario,
                email_usuario,
                senhaCriptografada
            ))
        ) {
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
        usuario: { id_usuario },
    } = req

    if (
        !nome_usuario &&
        !email_usuario &&
        !senha &&
        !cpf_usuario &&
        !telefone_usuario
    ) {
        return res
            .status(404)
            .json('É obrigatório informar ao menos um campo para atualização')
    }

    try {
        const usuarioObj = {}

        if (nome_usuario) {
            usuarioObj.nome_usuario = nome_usuario
        }

        if (email_usuario) {
            if (email_usuario !== req.usuario.email_usuario) {
                if (await checkEmailUser(email_usuario)) {
                    return res
                        .status(400)
                        .json(
                            'Email indisponível. Por favor, insira outro endereço.'
                        )
                }
            }

            usuarioObj.email_usuario = email_usuario
        }

        if (senha) {
            usuarioObj.senha = await bcrypt.hash(senha, 10)
        }

        if (cpf_usuario) {
            usuarioObj.cpf_usuario = cpf_usuario
        }

        if (telefone_usuario) {
            usuarioObj.telefone_usuario = telefone_usuario
        }

        if (!(await updateUser(usuarioObj, id_usuario))) {
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
