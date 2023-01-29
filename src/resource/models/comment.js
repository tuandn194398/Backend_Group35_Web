const mongoose = require('mongoose');

const comment = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    rating: {
        type: Number, 
        min: 0, max: 5,
        default: 0,
    },
    userId: {
        type: String,
        require: true
    },
    productId: {
        type: String,
        require: true
    },
    status: {
        type: String
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
});

module.exports = mongoose.model('comments', comment)