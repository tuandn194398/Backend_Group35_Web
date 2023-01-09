const productModel = require("../models/products");
const httpStatus = require("../utils/httpStatus");

const productControler = {};

productControler.createProduct = async(req, res, next) =>{
    try{
        const{
            name,
            categoryId,
            shopId,
            price,
            quantity,
            description,
        } = req.body;
        const product = new productModel({
            name: name,
            categoryId: categoryId,
            shopId: shopId,
            price: price,
            quantity: quantity,
            description: description,
            createAt: Date(Date.now()).toString(),
        });
        try{
            const saveProduct = await product.save();
            res.status(httpStatus.CREATED).json({
                data:{
                    id: saveProduct._id,
                    name: saveProduct.name,
                    shopId: saveProduct.shopId,
                    categoryId: saveProduct.categoryId,
                    price: saveProduct.price,
                    quantity: saveProduct.quantity,
                    description: saveProduct.description,
                    createAt: saveProduct.createAt,
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

module.exports = productControler;