const mongoose = require('mongoose');

const orderProduct = new mongoose.Schema({
    productId: {
        type: String,
        require: true
    },
    orderId: {
        type: String,
        require: true
    },
    totalPrice: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        min: 0,
        require: true
    },
});

module.exports = mongoose.model('order_products', orderProduct)