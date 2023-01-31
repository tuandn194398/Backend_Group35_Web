const accountController = require('../controllers/account');
const express = require('express');

const accountRoutes = express.Router();

accountRoutes.post("/signup", accountController.signup);
accountRoutes.post("/login", accountController.login);
accountRoutes.post("/change-password", accountController.changePassword);
accountRoutes.post("/get-user", accountController.getUserById);
accountRoutes.post("/edit-user",accountController.editInfo)
module.exports =  accountRoutes;