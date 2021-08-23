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
const customerRoute = require('./routes/customer-route')
const orderRoute = require('./routes/order-route')

app.use(bodyParse.json({
    limit: '5mb'
}))
app.use(bodyParse.urlencoded({ extended: false }))

//CORS
app.use(function(req, res, next) {
    res.header('Acess-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    next();
})



app.use('/', indexRoute)
app.use('/products', productRoute)
app.use('/customers', customerRoute)
app.use('/orders', orderRoute)



module.exports = app