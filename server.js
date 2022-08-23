const express = require("express");
const app = express()
const { connectDB } = require('./database/connection');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//mongoose - configuração do mongo


//cors - evitar erros de cors
const cors = require("cors")

//arquivo .env - oque está nesse arquivo não é upado no git
require('dotenv').config()

//porta que a aplicação irá funcionar, caso sela local: 9090 caso seja em um servidor podemos indica-la no arquivo .env ou deixar a cargo do servidor


//definindo a utilização do cors
app.use(cors())

app.use(
    express.urlencoded({
        extended:true,
    }),
)

//definindo a utilização de json
app.use(express.json())

//definindo a constante da rota
const usuariosRoutes = require('./src/routes/usuariosRoutes')
const reservaRoutes = require('./src/routes/reservasRoutes')

app.use('/usuarios', usuariosRoutes)
app.use('/reservas', reservaRoutes)
//rota principal
app.get('/', (req, res) =>{

    res.json({message: "Olá mundo!"});

})

connectDB()


module.exports = app