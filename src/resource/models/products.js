const mongoose = require('mongoose');

const product = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        // type: String,
        // require: true,
    },
    shopId: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: false,
        default: 0,
    },
    image: {
        type: String,
        require: false,
    },
    description: {
        type: String,
        require: false,
        default: ''
    },
    address:{
        type:String,
        require: true,
    },
    createAt: {
        type: String,
        require: false,
        default: '',
    }
});

module.exports = mongoose.model('products',product)