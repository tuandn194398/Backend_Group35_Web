const orderModel = require("../models/order");
const orderProductModel = require("../models/orderProduct");
const productModel = require("../models/products");
const httpStatus = require("../utils/httpStatus");

const orderControler = {};

orderControler.createOrder = async (req, res, next) => {
    try {
        const {
            fullName,
            address,
            phoneNumber,
            productList,
            totalPrice,
            paymentMethod,
            deliveryUnit,
            status,
            buyerId,
            shopId,
        } = req.body;
        const order = new orderModel({
            fullName: fullName,
            address: address,
            phoneNumber: phoneNumber,
            productList: productList,
            totalPrice: totalPrice,
            paymentMethod: paymentMethod,
            deliveryUnit: deliveryUnit,
            status: status,
            createAt: Date(Date.now()).toString(),
            updateAt: Date(Date.now()).toString(),
            buyerId: buyerId,
            shopId: shopId,
        });
        try {
            const saveOrder = await order.save();
            res.status(httpStatus.CREATED).json(saveOrder)
        } catch {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "BAD_REQUEST",
            });
        }

        /* let pList = []
        for (let i = 0; i < productList.length; i++) {
            if (!pList.includes(productList[i])) {
                let product = await productModel.findById(productList[i], 'price').exec();
                const orderProduct = new orderProductModel({
                    productId: productList[i],
                    orderId: saveOrder._id,
                    quantity: 1,
                    totalPrice: product.price,
                });
                try {
                    const saveOrderProduct = await orderProduct.save();
                    res.status(httpStatus.CREATED).json(saveOrderProduct)
                } catch {
                    return res.status(httpStatus.BAD_REQUEST).json({
                        message: "ERROR REQUEST",
                    });
                }
            } else {
                let orderProduct = await orderProductModel.findOne({ productId: productList[i] }).exec();
                let product = await productModel.findById(productList[i], 'price').exec();
                let orderProductSaved = await orderProductModel.findByIdAndUpdate({ productId: productList[i] }, {
                    quantity: orderProduct.quantity + 1,
                    totalPrice: (orderProduct.quantity + 1) * product.price,
                }, { new: true });
                try {
                    const save = await orderProductSaved.save();
                    res.status(httpStatus.CREATED).json(save)
                } catch {
                    return res.status(httpStatus.BAD_REQUEST).json({
                        message: "ERROR REQUEST22",
                    });
                }
            }
        } */
    } catch {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "LOST SERVER"
        });
    }
}

orderControler.show = async (req, res, next) => {
    res.status(200).json({
        message: 'Show order!'
    });
}

orderControler.updateOrder = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const {
            status,
        } = req.body
        let orderSaved = await orderModel.findByIdAndUpdate(_id, {
            status: status,
            updateAt: Date(Date.now()).toString(),
        }, { new: true });
        if (orderSaved == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Order is null" });
        }
        return res.status(httpStatus.OK).json({
            message: orderSaved
        });
    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

orderControler.addProductToOrder = async (req, res, next) => {
    try {
        const { _id, productId } = req.params;
        let order = await orderModel.findById(_id, 'productList').exec();
        if (order == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Order is null" });
        }
        order.productList.push(productId)
        let orderSaved = await orderModel.findByIdAndUpdate(_id, {
            productList: order.productList,
            updateAt: Date(Date.now()).toString(),
        }, { new: true });

        try {
            const saveOrder = await orderSaved.save();
            res.status(httpStatus.CREATED).json(saveOrder)
        } catch {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "BAD_REQUEST2",
            });
        }
    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

orderControler.getOrderList = async (req, res, next) => {
    try {
        const { userId } = req.params;
        let order = await orderModel.find({ buyerId: userId }, 'productList').exec();
        if (order == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Order is null" });
        }

        res.status(200).json({
            message: order
        });
    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

orderControler.getProductDetail = async (req, res, next) => {
    try {
        const { _id } = req.params;
        let order = await orderModel.findById(_id, 'productList').exec();
        if (order == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Order is null" });
        }

        const productList = order.productList
        console.log(productList[1])

        let list = []
        for (let i = 0; i < productList.length; i++) {
            let productDetail = await orderProductModel.findById(productList[i]).exec();
            list.push(productDetail)
        }

        res.status(200).json({
            message: list
        });
    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

orderControler.getOrderDetail = async (req, res, next) => {
    try {
        const { _id } = req.params;
        let order = await orderModel.findById(_id).exec();
        if (order == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Order is null" });
        }

        res.status(200).json({
            message: order
        });
    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

orderControler.deleteOrder = async (req, res, next) => {
    try {
        const { _id } = req.params;
        let order = await orderModel.findByIdAndDelete(_id).exec();
        if (order == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "Can not find order" });
        }
        return res.status(httpStatus.ACCEPTED).json({
            message: "DELETE ORDER SUCCESSFULLY!"
        });
    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

orderControler.searchOrder = async (req, res, next) => {

}

module.exports = orderControler;