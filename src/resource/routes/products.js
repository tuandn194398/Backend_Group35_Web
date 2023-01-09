const accountController = require('../controllers/products');
const express = require('express');

const productRoutes = express.Router();

productRoutes.post("/create-product", accountController.createProduct);

module.exports =  productRoutes;