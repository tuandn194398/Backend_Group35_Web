const orderModel = require("../models/order");
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

orderControler.deleteProduct = async (req, res, next) => {
    try {
        const { _id } = req.params;
        console.log(_id)
        let order = await orderModel.findByIdAndDelete(_id).exec();
        if(order == null){
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not find order"});
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