const cartModel = require("../models/cart");
const accountModel = require('../models/account');
const productModel = require("../models/products");
const httpStatus = require("../utils/httpStatus");

const cartControler = {};

cartControler.addToCart = async(req, res, next) =>{
    try{
        const{
            userId,
            productList,
            quantity,
        } = req.body;
        const cart = new cartModel({
            userId: userId,
            productList: productList,
            quantity: quantity,
        });
        try{
            const saveCart = await cart.save();
            res.status(httpStatus.CREATED).json({
                data:{
                    id: saveCart._id,
                    userId: saveCart.userId,
                    productList: saveCart.productList,
                    quantity: saveCart.quantity,
                }
            })
        }catch{
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "BAD_REQUEST",
            });
        }
    }catch{
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

cartControler.show = async(req, res, next) => {
    res.status(200).json({
        message:'Show cart'
    });
}

cartControler.modifyProductInfo = async(req, res, next) => {
    try{
        const{
            userId,
            productList,
            quantity,
        } = req.body;
        const cart = new cartModel({
            userId: userId,
            productList: productList,
            quantity: quantity,
        });
        try{
            const updateCart = await cart.updateOne(req.body);
            res.status(httpStatus.updateOne).json({
                data:{
                    id: updateCart._id,
                    userId: updateCart.userId,
                    productList: updateCart.productList,
                    quantity: updateCart.quantity,
                }
            })
        }catch{
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "BAD_REQUEST",
            });
        }
    }catch{
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

cartControler.getCartDetail = async(req, res, next) => {
    await cartModel.find({userId: req.params.id})
        .then(cart => res.json(cart))
        .catch(next);
}

cartControler.deleteProduct = async(req, res, next) => {
    
}

module.exports = cartControler;