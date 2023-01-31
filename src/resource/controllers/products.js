const productModel = require("../models/products");
const categoryModel = require('../models/category')
const { use } = require("../routes/account");
const httpStatus = require("../utils/httpStatus");

const productControler = {};

productControler.createProduct = async(req, res, next) =>{
    try{
        const{
            name,
            categoryName,
            shopId,
            price,
            quantity,
            address,
            description,
            image,
        } = req.body;
        let category =  await categoryModel.findOne(
            {name: categoryName}
        )
        if (category == null){
            return res.status(httpStatus.BAD_GATEWAY).json({
                message: "CAN'T FIND CATEGORY",
            });
        }
        const product = new productModel({
            name: name,
            categoryId: category._id,
            shopId: shopId,
            price: price,
            quantity: quantity,
            address: address,
            description: description,
            image: image,
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
                    address: saveProduct.address,
                    description: saveProduct.description,
                    image: saveProduct.image,
                    createAt: saveProduct.createAt,
                }
            })
        }catch(e){
            return res.status(httpStatus.BAD_REQUEST).json({
                message:"BAD REQUEST " + e.message,
            });
        }
    }catch(e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message:"LOST SERVER " + e.message
        });

    }
}
productControler.deleteProduct = async(req, res, next) => {
    try{
        let id = req.body.id;
        let product = await productModel.findByIdAndDelete({_id:id})
        .exec();
        if(product == null){
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not find product"});
        }
        return res.status(httpStatus.ACCEPTED).json({
            message: "DELETE SUCCESS"
        });
    }catch(error){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
}
productControler.editProduct = async(req, res, next) => {
    try{
        let userId = req.body.userId;
        let productId = req.body.productId;
        let productFind = await productModel.findById(productId);
        let shopId = productFind.shopId
        if(productFind == null){
            return res.status(httpStatus.NOT_FOUND).json({
                message:"CAN'T FIND PRODUCT"
            });
        };
        if(shopId.toString() !== userId){
            return res.status(httpStatus.FORBIDDEN).json({message: "Can not edit this post"});
        }
        const{
            name,
            price,
            quantity,
            address,
            description,
            image,
        } = req.body
        let productSaved = await productModel.findByIdAndUpdate(productId,{
            name: name,
            price: price,
            quantity: quantity,
            address: address,
            description: description,
            image: image,
        },{new: true});
        return res.status(httpStatus.OK).json({
            data: productSaved
        });
    }catch(error){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
    }
}
productControler.getProductDetail = async(req, res, next) => {
    try{
        let productId = req.body.productId;
        let product = await productModel.findById(productId)
        if(product == null){
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not find product"});
        }
        return res.status(httpStatus.OK).json({
            data: product,
        });
    }catch{
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
}
productControler.search  = async(req, res, next) =>{
    let key = req.body.search;
    let limit = req.body.limit;
    let product = await productModel.find({
            
                name:{ $regex: key, $options:'i'},
            
    }).limit(limit);
    if(product == null){
        return res.status(httpStatus.NOT_FOUND).json({message: "Can not find product"});
    }
    return res.status(httpStatus.OK).json({
        data: product,
    })

}
productControler.getAllProduct = async(req, res, next) =>{
    let limit = req.body.limit;
    try{
        const products = await productModel.find().limit(limit).sort('createAt')
        return res.status(httpStatus.OK).json({
            data: products,
        });

    }catch(error){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "LOST SERVER" 
        });
    }
}
productControler.getProductByCategoryId = async(req, res, next) =>{
 //24sp/page
}
module.exports = productControler;