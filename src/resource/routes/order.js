const orderController = require('../controllers/order');
const express = require('express');

const orderRoutes = express.Router();

orderRoutes.post('/create', orderController.createOrder);
orderRoutes.put('/update/:_id', orderController.updateOrder);
orderRoutes.put('/addProduct/:_id/:productId', orderController.addProductToOrder);
orderRoutes.delete('/delete/:_id', orderController.deleteOrder);
orderRoutes.get('/getOrderList/:userId', orderController.getOrderList);
orderRoutes.get('/getOrderDetail/:_id', orderController.getOrderDetail);
orderRoutes.get('/getProductDetail/:_id', orderController.getProductDetail);
orderRoutes.get('/getBuyOrderList/:userId', orderController.getBuyOrderList);
orderRoutes.get('/getSellOrderList/:shopId', orderController.getSellOrderList);
/* orderRoutes.use('/:slug', orderController.show); */

module.exports =  orderRoutes;