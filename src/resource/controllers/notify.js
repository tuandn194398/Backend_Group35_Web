const notifyModel = require("../models/notify");
const httpStatus = require("../utils/httpStatus");

const notifyControler = {};

notifyControler.createNotify = async (req, res, next) => {
    try {
        const {
            content,
            title,
            status,
            userIdSend,
            userIdTake,
            productId,
            orderId,
        } = req.body;
        const notify = new notifyModel({
            content: content,
            title: title,
            orderId: orderId,
            userIdSend: userIdSend,
            userIdTake: userIdTake,
            productId: productId,
            status: status,
            createAt: Date(Date.now()).toString(),
            updateAt: Date(Date.now()).toString(),
        });
        try {
            const saveNotify = await notify.save();
            res.status(httpStatus.CREATED).json(saveNotify)
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

notifyControler.editNotify = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const {
            title,
            content,
            status,
            userIdTake,
            productId,
            orderId,
        } = req.body;
        let notifySaved = await notifyModel.findByIdAndUpdate(_id, { 
            title: title,
            content: content,
            status: status, 
            userIdTake: userIdTake,
            productId: productId,
            orderId: orderId,
            updateAt: Date(Date.now()).toString(),
        }, { new: true });
        if (notifySaved == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "notify is null" });
        }
        return res.status(httpStatus.OK).json({
            message: notifySaved
        });
    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

notifyControler.deleteNotify = async (req, res, next) => {
    try {
        const { _id } = req.params;
        let notify = await notifyModel.findByIdAndDelete(_id).exec();
        if(notify == null){
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not find notify"});
        }
        return res.status(httpStatus.ACCEPTED).json({
            message: "DELETE notify SUCCESSFULLY!"
        });
    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

notifyControler.getNotify = async (req, res, next) => {
    try {
        const { _id } = req.params;
        let notify = await notifyModel.find({_id: _id}).exec();
        if(notify == null){
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not find notify"});
        }
        return res.status(httpStatus.ACCEPTED).json({
            message: notify
        });
    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

notifyControler.show = async (req, res, next) => {
    res.status(200).json({
        message: 'Show notify!'
    });
}

module.exports = notifyControler;