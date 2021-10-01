const knex = require('../config/databaseConextion')
const bcrypt = require('bcrypt')

const cadastrarClientes = async (req, res) => {
    const { nome, email, senha, ...dadosCliente } = req.body
    const { id: usuario_id } = req.usuario

    try {
        const clienteCheck = await knex('clientes')
            .where('email', email)
            .first()

        if (clienteCheck) {
            return res
                .status(400)
                .json(
                    'O email já foi cadastro, por favor insira um email diferente.'
                )
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const clienteObj = {
            usuario_id,
            nome,
            email,
            senha: senhaCriptografada,
            ...dadosCliente,
        }

        const cliente = await knex('clientes').insert(clienteObj)

        if (!cliente) {
            return res.status(400).json('O cliente não foi cadastrado.')
        }

        return res.status(200).json('O cliente foi cadastrado com sucesso!')
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = cadastrarClientes
