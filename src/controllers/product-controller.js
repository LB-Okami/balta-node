'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')


//A cada novo Controller no Node é necessário criar uma rota para tal
exports.get = (req, res, next) => {
    // ({ active: true }) traz apenas os produtos que estão disponíveis (true)
    repository.get() // Caso não coloque a , e não identifique os campos a serem trazidos, todos serão listados como padrão ({}) 
    .then(data => { // .then funciona como um try e depois o .catch 
        res.status(200).send(data)
        
    }).catch(error => {
        res.status(400).send({ message: 'Falha ao listar os produto', data: error })
    })
}

exports.getBySlug = (req, res, next) => {
    // ({ active: true }) traz apenas os produtos que estão disponíveis (true)
    repository.getBySlug( req.params.slug ) // Caso não coloque a "," e não identifique os campos a serem trazidos, todos serão listados como padrão ({}) 
    .then(data => { // .then funciona como um try e depois o .catch 
        res.status(200).send(data)
        
    }).catch(error => {
        res.status(400).send({ message: 'Falha ao listar os produto', data: error })
    })
}

exports.getById = (req, res, next) => {
    // ({ active: true }) traz apenas os produtos que estão disponíveis (true)
    repository.getById( req.params.id ) // Caso não coloque a "," e não identifique os campos a serem trazidos, todos serão listados como padrão ({}) 
    .then(data => { // .then funciona como um try e depois o .catch 
        res.status(200).send(data)
        
    }).catch(error => {
        res.status(400).send({ message: 'Falha ao listar o produto', data: error })
    })
}

exports.getByTag = (req, res, next) => {
    // ({ active: true }) traz apenas os produtos que estão disponíveis (true)
    repository.getByTag( req.params.tag ) // Caso não coloque a "," e não identifique os campos a serem trazidos, todos serão listados como padrão ({}) 
    .then(data => { // .then funciona como um try e depois o .catch 
        res.status(200).send(data)
        
    }).catch(error => {
        res.status(400).send({ message: 'Falha ao listar o produto', data: error })
    })
}

exports.post = (req, res, next) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter ao menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 5, 'O slug deve conter ao menos 5 caracteres')
    contract.hasMinLen(req.body.description, 5, 'A descrição deve conter ao menos 5 caracteres')
    
    //Verifica se os dados são válidos
    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }
    
    repository.create(req.body)
    .then(x => { // .then funciona como um try e depois o .catch 
        res.status(201).send({ message: 'Produto cadastrado com sucesso' })
        
    }).catch(error => {
        res.status(400).send({ message: 'Falha ao cadastrar o produto', data: error })
        
    })
}
exports.put = (req, res, next) => {
    repository.update(req.body, req.params.id)
    .then(x => {
        res.status(200).send({ message: 'Produto atualizado com sucesso' })
    }). catch(error => {
        res.status(400).send({ message: 'Falha ao atualizar o produto', data: error })
    })
}
exports.delete = (req, res, next) => {
    repository.delete(req.body.id).then(x => {
        res.status(200).send({ message: 'Produto deletado com sucesso' })
    }). catch(error => {
        res.status(400).send({ message: 'Falha ao deletar o produto', data: error })
    })
}