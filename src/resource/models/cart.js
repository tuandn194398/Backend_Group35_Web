const mongoose = require('mongoose');

const cart = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    productList: {
        type: Array,
        require: true
    },
    quantity: {
        type: Number,
        default: 0,
        require: true
    },
});

module.exports = mongoose.model('carts', cart)