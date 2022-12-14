const productModel = require("../models/products");
const { use } = require("../routes/account");
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
            address,
            description,
        } = req.body;
        const product = new productModel({
            name: name,
            categoryId: categoryId,
            shopId: shopId,
            price: price,
            quantity: quantity,
            address: address,
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
                    address: saveProduct.address,
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
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "LOST SERVER"
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
            address,
            description,
        } = req.body
        let productSaved = await productModel.findByIdAndUpdate(productId,{
            name: name,
            price: price,
            quantity: quantity,
            address: address,
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
    let key = req.query.search;
    let product = await productModel.find({
        "$or":[
            {
                name:{ $regex: key, $options:'i'},
            },
            {
                categoryId: { $regex: key, $options:'i'},
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
productControler.getAllProduct = async(req, res, next) =>{
    let limit = req.query.search;
    try{
        const products = await productModel.find().limit(limit)
        return res.status(httpStatus.OK).json({
            data: products,
        });

    }catch(error){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "LOST SERVER"
        });
    }
}
productControler.getProductByCategory = async(req, res, next) =>{
 //24sp/page
}
module.exports = productControler;