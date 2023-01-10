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
productControler.deleteProduct = async(req, res, next) => {
    try{
        let id = req.params.id;
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
        let productId = req.params.productId;
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
            description,
        } = req.body
        let productSaved = await productModel.findByIdAndUpdate(productId,{
            name: name,
            price: price,
            quantity: quantity,
            description: description,
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
        let productId = req.params.productId;
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
    let key = req.params.key
    let product = await productModel.find({
        "$or":[
            {
                name:{ $regex: key},
            },
            {
                categoryId: { $regex: key},
            },
        ]
    });
    if(product == null){
        return res.status(httpStatus.NOT_FOUND).json({message: "Can not find product"});
    }
    return res.status(httpStatus.OK).json({
        data: product,
    })
}
module.exports = productControler;