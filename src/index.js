require('dotenv').config({
    path: __dirname + '../env/.env'
})

const express = require('express')
const  routesUsuarios  = require('./routes/usuarios')
const  routesClientes = require('./routes/clientes')

const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

app.use(routesUsuarios)
app.use(routesClientes)

app.listen(process.env.PORT || 3000)
