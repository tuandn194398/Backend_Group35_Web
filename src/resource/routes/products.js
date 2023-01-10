const express = require('express');
const productControler = require('../controllers/products');

const productRoutes = express.Router();

productRoutes.post("/create-product", productControler.createProduct);
productRoutes.delete("/delete-product/:id",productControler.deleteProduct);
productRoutes.post("/edit-product/:productId",productControler.editProduct);
productRoutes.get("/get-product-detail/:productId",productControler.getProductDetail);
productRoutes.get("/search/:key", productControler.search)
module.exports =  productRoutes;