'use strict'

const express = require('express')
const bodyParse = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const router = express.Router()

//Conecta ao banco de dados
mongoose.connect('mongodb+srv://lucas:741037@node-storage.ap6s0.mongodb.net/db-node?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

//Carrega as models
const Product = require('./models/product')

//Carrega as rotas
const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: false }))

app.use('/', indexRoute)
app.use('/products', productRoute)



module.exports = app