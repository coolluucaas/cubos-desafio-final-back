require('dotenv').config({ path: `./env/.env.${process.env.NODE_ENV}` })
const express = require('express')
const cors = require('cors')

const routesUsuarios = require('./routes/usersRoutes')
const routesClientes = require('./routes/clientsRoutes')
const routesCobrancas = require('./routes/debtsRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use(routesUsuarios)
app.use(routesClientes)
app.use(routesCobrancas)

app.listen(process.env.PORT || 3003)
