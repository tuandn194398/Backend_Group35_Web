const express = require("express");

const accountRoutes = require("../account")
const productRoutes = require("../products")

const apiRoutes = express.Router();

apiRoutes.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});
apiRoutes.use("/accounts", accountRoutes)
apiRoutes.use("/products", productRoutes)
module.exports = apiRoutes;