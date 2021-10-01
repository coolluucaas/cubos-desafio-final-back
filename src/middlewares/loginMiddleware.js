
const jwt = require('jsonwebtoken');
const knex = require('../config/databaseConextion');

const verificadorLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json('Não autorizado');
    }

    try {
        const token = authorization.replace('Bearer ', '').trim();

        const { id } = jwt.verify(token, process.env.JWT_SENHA);

        const usuarioCheck = await knex('usuarios')
            .where('id', id)
            .first()

        if (!usuarioCheck) {
            return res.status(404).json('Usuario não encontrado')
        }   

        const { senha, ...usuario } = usuarioCheck;

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = verificadorLogin