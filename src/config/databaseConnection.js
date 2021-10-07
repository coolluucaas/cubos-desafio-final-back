const isProduction = process.env.NODE_ENV === 'production'

let connectionObj = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,        
    },
}

if (isProduction) {
    connectionObj.connection.ssl = { rejectUnauthorized: false }
}

const knex = require('knex')(connectionObj)

module.exports = knex
