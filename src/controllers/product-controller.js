'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

//A cada novo Controller no Node é necessário criar uma rota para tal
exports.get = (req, res, next) => {
    // ({ active: true }) traz apenas os produtos que estão disponíveis (true)
    Product.find({ active: true }, "title slug price description") // Caso não coloque a , e não identifique os campos a serem trazidos, todos serão listados como padrão ({}) 
        .then(data => { // .then funciona como um try e depois o .catch 
            res.status(200).send(data)

        }).catch(error => {
            res.status(400).send({ message: 'Falha ao listar os produto', data: error })
        })
}

exports.getBySlug = (req, res, next) => {
    // ({ active: true }) traz apenas os produtos que estão disponíveis (true)
    Product.findOne({ slug: req.params.slug,  active: true }, "title slug description tags price") // Caso não coloque a "," e não identifique os campos a serem trazidos, todos serão listados como padrão ({}) 
        .then(data => { // .then funciona como um try e depois o .catch 
            res.status(200).send(data)

        }).catch(error => {
            res.status(400).send({ message: 'Falha ao listar os produto', data: error })
        })
}

exports.getById = (req, res, next) => {
    // ({ active: true }) traz apenas os produtos que estão disponíveis (true)
    Product.findById( req.params.id ) // Caso não coloque a "," e não identifique os campos a serem trazidos, todos serão listados como padrão ({}) 
        .then(data => { // .then funciona como um try e depois o .catch 
            res.status(200).send(data)

        }).catch(error => {
            res.status(400).send({ message: 'Falha ao listar o produto', data: error })
        })
}

exports.getByTag = (req, res, next) => {
    // ({ active: true }) traz apenas os produtos que estão disponíveis (true)
    Product.find({ tags: req.params.tag, active: true }) // Caso não coloque a "," e não identifique os campos a serem trazidos, todos serão listados como padrão ({}) 
        .then(data => { // .then funciona como um try e depois o .catch 
            res.status(200).send(data)

        }).catch(error => {
            res.status(400).send({ message: 'Falha ao listar o produto', data: error })
        })
}

exports.post = (req, res, next) => {
    var product = new Product(req.body)
    product.save()
        .then(x => { // .then funciona como um try e depois o .catch 
            res.status(201).send({ message: 'Produto cadastrado com sucesso' })

        }).catch(error => {
            res.status(400).send({ message: 'Falha ao cadastrar o produto', data: error })

        })
}
exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    }).then(x => {
        res.status(200).send({ message: 'Produto atualizado com sucesso' })
    }). catch(error => {
        res.status(400).send({ message: 'Falha ao atualizar o produto', data: error })
    })
}
exports.delete = (req, res, next) => {
    Product.findOneAndRemove(req.params.id).then(x => {
        res.status(200).send({ message: 'Produto deletado com sucesso' })
    }). catch(error => {
        res.status(400).send({ message: 'Falha ao deletar o produto', data: error })
    })
}