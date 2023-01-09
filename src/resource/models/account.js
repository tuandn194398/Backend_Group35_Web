const mongoose = require('mongoose');

const account = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    fullName: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true,
        default: ''
    },
    phoneNumber: {
        type: String,
        require: false,
    },
    dayOfBirth: {
        type: String,
        require: false,
        default: '',
    }

});
account.index({email: 1}) // index

module.exports = mongoose.model('accounts', account)