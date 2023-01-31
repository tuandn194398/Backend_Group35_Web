const express = require('express');
const productControler = require('../controllers/products');

const productRoutes = express.Router();

productRoutes.post("/create-product", productControler.createProduct);
productRoutes.post("/delete-product",productControler.deleteProduct);
productRoutes.post("/edit-product",productControler.editProduct);
productRoutes.post("/get-product-detail",productControler.getProductDetail);
productRoutes.post("/search", productControler.search);
productRoutes.post("/get-all-product",productControler.getAllProduct);
module.exports =  productRoutes;