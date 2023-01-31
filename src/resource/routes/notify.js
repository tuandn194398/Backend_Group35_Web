const notifyController = require('../controllers/notify');
const express = require('express');

const notifyRoutes = express.Router();

notifyRoutes.post('/createNotify', notifyController.createNotify);
notifyRoutes.put('/editNotify/:_id', notifyController.editNotify);
notifyRoutes.delete('/deleteNotify/:_id', notifyController.deleteNotify);
notifyRoutes.get('/getNotify/:_id', notifyController.getNotify);
/* orderRoutes.use('/:slug', orderController.show); */

module.exports =  notifyRoutes;