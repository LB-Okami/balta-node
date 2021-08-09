'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')
const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/product-repository')


//A cada novo Controller no Node é necessário criar uma rota para tal
exports.get = async (req, res, next) => {
    try {
        var data = await repository.get()
        res.status(200).send(data)
    }
    catch(e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição!"
        })
    }
}

exports.getBySlug = async (req, res, next) => {
    // ({ active: true }) traz apenas os produtos que estão disponíveis (true)
    try {
        let data =  await repository.getBySlug( req.params.slug ) // Caso não coloque a "," e não identifique os campos a serem trazidos, todos serão listados como padrão ({}) 
        res.status(200).send(data)
    }
    catch(error) {
        res.status(400).send({ message: 'Falha ao listar os produto' })
    }
}

exports.getById = async (req, res, next) => {
    // ({ active: true }) traz apenas os produtos que estão disponíveis (true)
    try {
        let data = await repository.getById( req.params.id ) // Caso não coloque a "," e não identifique os campos a serem trazidos, todos serão listados como padrão ({}) 
        res.status(200).send(data)
    }
    catch(error) {
        res.status(400).send({ message: 'Falha ao listar o produto' })
    }
}

exports.getByTag = async (req, res, next) => {
    // ({ active: true }) traz apenas os produtos que estão disponíveis (true)
    try{
        let data = await repository.getByTag( req.params.tag ) // Caso não coloque a "," e não identifique os campos a serem trazidos, todos serão listados como padrão ({}) 
        res.status(200).send(data)
    }        
    catch(error) {
        res.status(400).send({ message: 'Falha ao listar o produto' })
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter ao menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 5, 'O slug deve conter ao menos 5 caracteres')
    contract.hasMinLen(req.body.description, 5, 'A descrição deve conter ao menos 5 caracteres')
    
    //Verifica se os dados são válidos
    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        await repository.create(req.body)
        res.status(201).send({ message: 'Produto cadastrado com sucesso' })
    }
    catch(error) {
        res.status(400).send({ message: 'Falha ao cadastrar o produto' })
    }
}

exports.put = async (req, res, next) => {
    let contract = new ValidationContract()
    
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter ao menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 5, 'O slug deve conter ao menos 5 caracteres')
    contract.hasMinLen(req.body.description, 5, 'A descrição deve conter ao menos 5 caracteres')

    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        await repository.update(req.body, req.params.id)
        res.status(200).send({ message: 'Produto atualizado com sucesso' })
    }
    catch(error) {
        res.status(400).send({ message: 'Falha ao atualizar o produto', data: error })
    }
}

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({ message: 'Produto deletado com sucesso' })
    }
    catch(error)  {
        res.status(400).send({ message: 'Falha ao deletar o produto' })
    }
}