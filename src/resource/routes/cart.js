const cartController = require('../controllers/cart');
const express = require('express');

const cartRoutes = express.Router();

cartRoutes.post('/create', cartController.addToCart);
cartRoutes.put('/update', cartController.modifyProductInfo);
cartRoutes.delete('/delete', cartController.deleteProduct);
cartRoutes.get('/getCart', cartController.getCartDetail);
cartRoutes.use('/:slug', cartController.show);


/* cartRoutes.post("/create-product", cartController.createProduct); */

module.exports =  cartRoutes;