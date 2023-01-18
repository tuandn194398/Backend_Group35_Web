const express = require('express');
const categoryController = require('../controllers/category');

const categoryRoutes = express.Router();

categoryRoutes.post("/create", categoryController.createCategory);
categoryRoutes.post("/getCategory/:categoryName", categoryController.getCategory);

module.exports = categoryRoutes;