const orderController = require('../controllers/order');
const express = require('express');

const orderRoutes = express.Router();

orderRoutes.post('/create', orderController.createOrder);
orderRoutes.put('/update/:_id', orderController.updateOrder);
orderRoutes.delete('/delete/:_id', orderController.deleteProduct);
orderRoutes.get('/getOrderList/:userId', orderController.getOrderList);
orderRoutes.get('/getOrderDetail/:_id', orderController.getOrderDetail);
/* orderRoutes.use('/:slug', orderController.show); */

module.exports =  orderRoutes;