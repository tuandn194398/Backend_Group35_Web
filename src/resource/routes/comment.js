const commentController = require('../controllers/comment');
const express = require('express');

const commentRoutes = express.Router();

commentRoutes.post('/createComment', commentController.createComment);
commentRoutes.put('/editComment/:_id', commentController.editComment);
commentRoutes.delete('/deleteComment/:_id', commentController.deleteComment);
commentRoutes.get('/getComment/:_id', commentController.getComment);
/* orderRoutes.use('/:slug', orderController.show); */

module.exports =  commentRoutes;