const mongoose = require('mongoose');

const category = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        default: '',
    }
})

module.exports = mongoose.model('categories',category);