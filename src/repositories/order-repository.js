'use strict'

const mongoose = require('mongoose')
const Order = mongoose.model('Order')

exports.get = async () => {
    //.populate traz os dados relacionados do campo (relacionamento de tabelas)
    let res = await Order.find({})
        .populate('customer', 'name email')
        .populate('items.product')
    return res
}

//Para post é diferente 
exports.create = async (data) => {
    var order = new Order(data)
    await order.save()
}

exports.delete = async (id) => {
    await Order.findByIdAndDelete(id)
}
