const mongoose = require('mongoose');

const category = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        default: '',
    }
})

module.exports = mongoose.model('categories',category);