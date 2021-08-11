'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/order-repository')
const guid = require('guid')

exports.post = async (req, res, next) => {
    try {
        await repository.create({
            customer: req.body.customer,
            //Gera um UUID aleatório a cada novo cadastro
            number: guid.raw().substring(0, 6),
            items: req.body.items
        })
        res.status(201).send({ message: 'Pedido cadastrado com sucesso' })
    }
    catch(error) {
        res.status(400).send({ message: 'Falha ao cadastrar o pedido', error })
    }
}

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

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.params.id)
        res.status(200).send({ message: 'Pedido deletado com sucesso' })
    }
    catch(error)  {
        res.status(400).send({ message: 'Falha ao deletar o pedido' })
    }
}