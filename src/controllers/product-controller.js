'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

//A cada novo Controller no Node é necessário criar uma rota para tal
exports.get = (req, res, next) => {
    // ({ active: true }) traz apenas os produtos que estão disponíveis (true)
    Product.find({ active: true }, "title slug price description") // Caso não coloque a , e não identifique os campos a serem trazidos, todos serão listados como padrão ({}) 
        .then(data => { // .then funciona como um try e depois o .catch 
            res.status(200).send(data)

        }).catch(e => {
            res.status(400).send({ message: 'Falha ao listar os produto', data: e })
        })
}

exports.post = (req, res, next) => {
    var product = new Product(req.body)
    product.save()
        .then(x => { // .then funciona como um try e depois o .catch 
            res.status(201).send({ message: 'Produto cadastrado com sucesso' })

        }).catch(e => {
            res.status(400).send({ message: 'Falha ao cadastrar o produto', data: e })

        })
}
exports.put = (req, res, next) => {
    let id = req.params.id
    res.status(200).send({ 
        id: id,
        item: req.body 
    })
}
exports.delete = (req, res, next) => {
    res.status(200).send(req.body)
}