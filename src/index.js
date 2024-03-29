const express = require('express');
const engine = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv/config");
const apiRoutes = require("./resource/routes/api/index");

const app = express();
const port = 3000;
const db = require('./config/db')

// Connect DB
db.connect();

/* mongoose.connect("mongodb+srv://webgroup35:zQeDy05bQ28mgQV7@cluster0.hesfnsg.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>{
        console.log('DB connection');
    })
    .catch((error) =>{
        console.log('Error connection to DB');
    }) */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));    
app.use("/api", apiRoutes);
app.get('/', (req, res) => {
    // res.render('home');
    res.status(200).json({
        message:'Welcome'
    });
});

app.listen(3000, () => {
    console.log(`Listening at http://localhost:${port}`);
});