const mongoose = require('mongoose');

const notify = new mongoose.Schema({
    title: {
        type: String, 
        require: true
    },
    content: {
        type: String,
        require: true
    },
    status: {
        type: String,  // da doc, chua doc, het han, dang hieu luc
        require: true
    },
    userIdSend: {
        type: String,
        require: true
    },
    userIdTake: {
        type: Array,
        require: true
    },
    productId: {
        type: String,
    },
    orderId: {
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

module.exports = mongoose.model('notifies', notify)