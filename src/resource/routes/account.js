const accountController = require('../controllers/account');
const express = require('express');

const accountRoutes = express.Router();

accountRoutes.post("/signup", accountController.signup);
accountRoutes.post("/login", accountController.login);
accountRoutes.post("/change-password/:userId", accountController.changePassword);
accountRoutes.get("/get-user/:userId", accountController.getUserById);
accountRoutes.post("/edit-user/:userId",accountController.editInfo)
module.exports =  accountRoutes;