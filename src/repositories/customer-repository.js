'use strict'

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')

exports.get = async () => {
    let res = await Customer.find({}, "name email")
    return res
}

//Para post é diferente 
exports.create = async (data) => {
    var customer = new Customer(data)
    await customer.save()
}
