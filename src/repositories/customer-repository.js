'use strict'

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')

exports.get = async () => {
    let res = await Customer.find({}, "name email")
    return res
}

exports.authenticate = async (data) => {
    let res = await Customer.findOne({
        email: data.email,
        password: data.password
    })
    return res
}

//Para post é diferente 
exports.create = async (data) => {
    var customer = new Customer(data)
    await customer.save()
}

exports.getById = async (id) => {
    let res = await Customer.findById(id)
    return res
}