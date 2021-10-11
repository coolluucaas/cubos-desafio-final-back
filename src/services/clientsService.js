const knex = require('../config/databaseConnection')

const findClientByEmail = async (email_cliente) => {
    return knex('clientes').where('email_cliente', email_cliente).first()
}

const findClientByName = async (nome_cliente) => {
    return knex('clientes')
        .select('id_cliente')
        .where('nome_cliente', nome_cliente)
        .first()
}

const findClientById = async (id_cliente) => {
    return knex('clientes').where('id_cliente', id_cliente).first()
}
const handleClientUpdateInputs = async (
    id_cliente,
    nome_cliente,
    email_cliente,
    cpf_cliente,
    telefone_cliente,
    cep,
    logradouro,
    complemento,
    referencia,
    bairro,
    cidade
) => {
    const clienteObj = {}
    if (
        !nome_cliente &&
        !email_cliente &&
        !cpf_cliente &&
        !telefone_cliente &&
        !cep &&
        !logradouro &&
        !complemento &&
        !referencia &&
        !bairro &&
        !cidade
    ) {
        return {
            success: false,
            statusCode: 404,
            message:
                'É obrigatório informar ao menos um campo para atualização',
        }
    }

    if (nome_cliente) {
        clienteObj.nome_cliente = nome_cliente
    }
    if (email_cliente) {
        const { email_cliente: email_cadastrado } = await findClientById(
            id_cliente
        )
        if (email_cliente !== email_cadastrado) {
            if (await findClientByEmail(email_cliente)) {
                return {
                    success: false,
                    statusCode: 400,
                    message:
                        'Email indisponível. Por favor, insira outro endereço.',
                }
            }
            clienteObj.email_cliente = email_cliente
        }
    }
    if (cpf_cliente) {
        clienteObj.cpf_cliente = cpf_cliente
    }
    if (telefone_cliente) {
        clienteObj.telefone_cliente = telefone_cliente
    }
    if (cep) {
        clienteObj.cep = cep
    }
    if (logradouro) {
        clienteObj.logradouro = logradouro
    }
    if (complemento) {
        clienteObj.complemento = complemento
    }
    if (referencia) {
        clienteObj.referencia = referencia
    }
    if (bairro) {
        clienteObj.bairro = bairro
    }
    if (cidade) {
        clienteObj.cidade = cidade
    }

    return {
        success: true,
        clienteObj,
    }
}

const listClients = async () => {
    return knex
        .with(
            'tabela_de_inadimplencia',
            knex
                .select([
                    'c.*',
                    'd.valor',
                    knex.raw(`(
            CASE
            WHEN d.esta_pago IS TRUE THEN d.valor
            ELSE 0
            END
           ) as valor_pago`),
                    knex.raw(`( 
            CASE 
            WHEN d.esta_pago IS FALSE AND d.data_vencimento < NOW() THEN 0
            ELSE 1
            END
            ) as status`),
                ])
                .from('clientes as c')
                .leftJoin('cobrancas as d', 'c.id_cliente', '=', 'd.id_cliente')
        )
        .select([
            'id_cliente',
            'nome_cliente',
            'email_cliente',
            'telefone_cliente',
            'cpf_cliente',
            'cep',
            'logradouro',
            'complemento',
            'referencia',
            'bairro',
            'cidade',
            knex.raw('sum(valor) as cobrancas_feitas'),
            knex.raw('sum(valor_pago) as cobrancas_recebidas'),
            knex.raw(`
    (
      CASE MIN(status)
      WHEN 0 THEN 'INADIMPLENTE'
      WHEN 1 THEN 'EM DIA'
      END
    ) as status`),
        ])
        .from('tabela_de_inadimplencia')
        .groupBy([
            'id_cliente',
            'nome_cliente',
            'email_cliente',
            'telefone_cliente',
            'cpf_cliente',
            'cep',
            'logradouro',
            'complemento',
            'referencia',
            'bairro',
            'cidade',
        ])
        .orderBy('id_cliente')
}

const insertClient = async (id_usuario, email_cliente, dadosCliente) => {
    const clienteObj = {
        id_usuario,
        email_cliente,
        ...dadosCliente,
    }

    return knex('clientes').insert(clienteObj)
}

const updateClient = async (clienteObj, id_cliente) => {
    return knex('clientes').update(clienteObj).where('id_cliente', id_cliente)
}

module.exports = {
    findClientById,
    findClientByEmail,
    findClientByName,
    handleClientUpdateInputs,
    listClients,
    insertClient,
    updateClient,
}
