'use strict'

const express = require('express')
const bodyParse = require('body-parser')

const app = express()
const router = express.Router()

//Carrega as rotas
const indexRoute = require('./routes/index-route')
const productRoute = require('./routes/product-route')

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: false }))

app.use('/', indexRoute)
app.use('/products', productRoute)



module.exports = app