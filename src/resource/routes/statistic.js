const statisticController = require('../controllers/statistic');
const express = require('express');

const statisticRoutes = express.Router();

statisticRoutes.get('/getRatingProduct/:productId', statisticController.getRatingProduct);
statisticRoutes.get('/getRatingShop/:userId', statisticController.getRatingShop);
statisticRoutes.get('/getSalesProduct/:productId', statisticController.getSalesProduct);
statisticRoutes.get('/getSalesShop/:userId', statisticController.getSalesShop);
/* orderRoutes.use('/:slug', orderController.show); */

module.exports =  statisticRoutes;