require('dotenv').config()

const express = require('express')
const  routesUsuarios  = require('./routes/usuarios')
const  routesClientes = require('./routes/clientes')

const app = express()

app.use(express.json())

app.use(routesUsuarios)
app.use(routesClientes)

app.listen(process.env.PORT)
