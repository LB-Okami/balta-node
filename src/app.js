'use strict'

const express = require('express')
const bodyParse = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const URI = process.env.NODE_ENV

const app = express()
const router = express.Router()

//Conecta ao banco de dados
mongoose.connect(`${URI}` , {useNewUrlParser: true, useUnifiedTopology: true});

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