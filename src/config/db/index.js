const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

async function connect() {
    try {
        await mongoose.connect(
            "mongodb+srv://webgroup35:zQeDy05bQ28mgQV7@cluster0.hesfnsg.mongodb.net/test",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log('Connect Successfully !!!');
    } catch (error) {
        console.log('Error connection to DB');
    }
}

module.exports = { connect };