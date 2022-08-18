const express = require("express");
const app = express()

//mongoose - configuração do mongo
const mongoose = require("mongoose")

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
const routesApi = require('./routes/routes')

app.use('/', routesApi)

//rota principal
app.get('/', (req, res) =>{

    res.json({message: "Olá mundo!"});

})

const DB_USER = process.env.DB_USER;
const DB_PASS =  encodeURIComponent(process.env.DB_PASS)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.idgbyqs.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log('conectamos ao banco de dados')
})
.catch((err) => {
    console.log(err)
})

module.exports = app