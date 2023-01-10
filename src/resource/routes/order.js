const orderController = require('../controllers/order');
const express = require('express');

const orderRoutes = express.Router();

orderRoutes.post('/create', orderController.addToCart);
orderRoutes.put('/update', orderController.modifyProductInfo);
orderRoutes.delete('/delete', orderController.deleteProduct);
orderRoutes.get('/getCart', orderController.getCartDetail);
orderRoutes.use('/:slug', orderController.show);

module.exports =  orderRoutes;