'use strict'

const ValidationContract = require('../validators/fluent-validator')
const repository = require('../repositories/customer-repository')
const md5 = require('md5')
const emailService = require('../services/email-service')
const config = require('../config')
const authService = require('../services/auth-service')

exports.post = async (req, res, next) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.name, 2, 'O nome deve conter ao menos 2 caracteres')
    contract.hasMinLen(req.body.password, 5, 'A senha deve conter ao menos 5 caracteres')

    contract.isEmail(req.body.email, "O e-mail informado não é válido")
    
    //Verifica se os dados são válidos
    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            roles: ["user"],
            //md5() já seria suficiente para criar um hash com cerca de 30 caracteres, porém a salt key dá ainda mais segurança
            password: md5(req.body.password + global.SALT_KEY) 
        })

        emailService.send(req.body.email, 'Bem vindo ao Node Store', global.EMAIL_TMPL.replace('{0}', req.body.name))

        res.status(201).send({ message: 'Cliente cadastrado com sucesso' })
    }
    catch(error) {
        res.status(400).send({ message: 'Falha ao cadastrar o cliente' })
    }
}

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            //md5() já seria suficiente para criar um hash com cerca de 30 caracteres, porém a salt key dá ainda mais segurança
            password: md5(req.body.password + global.SALT_KEY) 
        })

        if(!customer) {
            res.status(404).send({ message: "Usuário ou senha inválidos!" })
            return
        }

        let token = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name,
            roles: customer.roles
        })

        res.status(201).send({ 
            token: token,
            data: {
                email: customer.email,
                name: customer.name,
                roles: customer.roles
            }
        })
    }
    catch(error) {
        res.status(400).send({ message: 'Falha ao cadastrar o cliente' })
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


exports.refreshToken = async (req, res, next) => {
    try {

        //Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token']

        //Decodifica o token
        const data = await authService.decodeToken(token)

        const customer = await repository.getById(data.id)

        if(!customer) {
            res.status(404).send({ message: "Usuário ou senha inválidos!" })
            return
        }

        let tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email, 
            name: customer.name,
            roles: customer.roles
        })

        res.status(200).send({ 
            token: tokenData,
            data: {
                email: customer.email,
                name: customer.name
            }
        })
    }
    catch(error) {
        res.status(400).send({ message: 'Falha ao cadastrar o cliente' })
    }
}
