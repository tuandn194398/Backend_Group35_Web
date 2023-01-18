const categoryModel = require('../models/category');
const productModel = require('../models/products');

const httpStatus = require('../utils/httpStatus');

const categoryController = {};

categoryController.createCategory = async(req, res, next) =>{
    try{
        const {
            name,
            description,
        } = req.body;
        const category = new categoryModel({
            name: name,
            description: description
        });
        try{
            const saveCategory = await category.save();
            console.log(typeof(saveCategory._id))
            res.status(httpStatus.CREATED).json({
            data:{
                name: saveCategory.name,
                description: saveCategory.description,
            }
        });

        }catch(e){
            return res.status(httpStatus.BAD_REQUEST).json({
                message: e.message,
            });
        }
    }catch(e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "LOST SERVER"
        });

    }
}
categoryController.getCategory = async(req, res, next) =>{
    let limit = req.query.limit;
    try{
        const categoryName = req.params.categoryName;
        const category = await categoryModel.findOne({name:categoryName, $option: 'i'});
        console.log(typeof(categoryName))
        console.log(category._id)
        if(category == null){
            return res.status(httpStatus.BAD_GATEWAY).json({
                message: "CAN'T FIND CATEGORY",
            });
        }
        try{
            const products = await productModel.find(
                {categoryId: category._id}
            ).limit(limit)
            res.status(httpStatus.OK).json({
                data:products
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
module.exports = categoryController;