const orderModel = require("../models/cart");
const httpStatus = require("../utils/httpStatus");

const orderControler = {};

orderControler.addToCart = async(req, res, next) =>{

}

orderControler.show = async(req, res, next) => {
    res.status(200).json({
        message:'Show cart'
    });
}

orderControler.modifyProductInfo = async(req, res, next) => {
    
}

orderControler.getCartDetail = async(req, res, next) => {
    
}

orderControler.deleteProduct = async(req, res, next) => {
    
}

module.exports = orderControler;