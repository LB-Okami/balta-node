'use strict'

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')

exports.get = async () => {
    let res = await Product.find({
        active: true
    }, "title price slug")
    return res
}

//Para post é diferente 
exports.create = async (data) => {
    var customer = new Costumer(data)
    await customer.save()
}