const mongoose = require('mongoose');

const order = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    productList: {
        type: Array,
        require: true
    },
    totalPrice: {
        type: Number,
        require: true
    },
    paymentMethod: {
        type: String,
        require: true
    },
    deliveryUnit: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now,
        require: true
    },
    updateAt: {
        type: Date,
        default: Date.now,
        require: true
    },
    buyerId: {
        type: String,
        require: true
    },
    shopId: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('orders', order)