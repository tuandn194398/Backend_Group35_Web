// import accountController from "../controllers/account";
// import express from 'express';
const accountController = require('../controllers/account');
const express = require('express');

const accountRoutes = express.Router();

accountRoutes.post("/signup", accountController.signup);

module.exports =  accountRoutes;