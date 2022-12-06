const express = require('express');
const engine = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv/config");
const accountRoutes = require("./resource/routes/account");

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>{
        console.log('DB connection');
    })
    .catch((error) =>{
        console.log('Error connection to DB');
    })

app.use("/api", accountRoutes);
app.get('/', (req, res) => {
    // res.render('home');
    res.status(200).json({
        message:'Welcome'
    });
});

app.listen(3000, () => {
    console.log(`Listening at http://localhost:${port}`);
});