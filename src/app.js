'use strict'

const express = require('express')
const bodyParse = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const router = express.Router()

//Conecta ao banco de dados
mongoose.connect('mongodb://lucas:TzjGKFDYPLxfQF55@node-str-shard-00-00.ap6s0.mongodb.net:27017,node-str-shard-00-01.ap6s0.mongodb.net:27017,node-str-shard-00-02.ap6s0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-cb7wv4-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

//Carrega as models
const Product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')


//Carrega as rotas
const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: false }))

app.use('/', indexRoute)
app.use('/products', productRoute)



module.exports = app