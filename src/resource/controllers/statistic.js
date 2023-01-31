const commentModel = require("../models/comment");
const orderModel = require("../models/order");
const productModel = require("../models/products");
const orderProductModel = require("../models/orderProduct");
const httpStatus = require("../utils/httpStatus");

const statisticController = {};

statisticController.getRatingProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        let comment = await commentModel.find({ productId: productId }, 'rating').exec();
        if (comment == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "The product has not been rated yet" });
        }

        let avgRate = 0
        for (let i = 0; i < comment.length; i++) {
            avgRate += comment[i].rating
        }

        avgRate /= comment.length
        return res.status(httpStatus.ACCEPTED).json({
            message: avgRate
        });

    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

statisticController.getRatingShop = async (req, res, next) => {
    try {
        const { userId } = req.params;
        let product = await productModel.find({ shopId: userId }).exec();
        if (product == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "The shop hasn't any product!" });
        }

        let avgRateShop = 0, cnt = 0
        for (let i = 0; i < product.length; i++) {
            let comment = await commentModel.find({ productId: product[i]._id }, 'rating').exec();
            let avgRateProduct = 0
            let cml = comment.length
            if (cml != 0) {
                for (let j = 0; j < cml; j++) {
                    avgRateProduct += comment[j].rating
                }
                avgRateProduct /= cml
                avgRateShop += avgRateProduct
                cnt++
            }
        }

        avgRateShop /= cnt
        return res.status(httpStatus.ACCEPTED).json({
            message: avgRateShop
        });

    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

statisticController.getSalesProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        let comment = await commentModel.find({ productId: productId }).exec();
        if (comment == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "The product has not been rated yet" });
        }

        let avgRate = 0
        for (let i = 0; i < comment.length; i++) {
            avgRate += comment[i].rating
        }

        avgRate /= comment.length
        return res.status(httpStatus.ACCEPTED).json({
            message: avgRate
        });

    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

statisticController.getSalesShop = async (req, res, next) => {
    try {
        const { userId } = req.params;
        let product = await productModel.find({ shopId: userId }).exec();
        if (product == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "The shop hasn't any product!" });
        }

        let avgRateShop = 0, cnt = 0
        for (let i = 0; i < product.length; i++) {
            let comment = await commentModel.find({ productId: product[i]._id }).exec();
            let avgRateProduct = 0
            let cml = comment.length
            if (cml != 0) {
                for (let j = 0; j < cml; j++) {
                    avgRateProduct += comment[j].rating
                }
                avgRateProduct /= cml
                avgRateShop += avgRateProduct
                cnt++
            }
            console.log(avgRateShop)
        }

        avgRateShop /= cnt
        return res.status(httpStatus.ACCEPTED).json({
            message: avgRateShop
        });

    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

module.exports = statisticController;