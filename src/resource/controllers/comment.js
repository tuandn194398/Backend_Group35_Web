const commentModel = require("../models/comment");
const httpStatus = require("../utils/httpStatus");

const commentControler = {};

commentControler.createComment = async (req, res, next) => {
    try {
        const {
            content,
            rating,
            userId,
            productId,
            status,
        } = req.body;
        const comment = new commentModel({
            content: content,
            rating: rating,
            userId: userId,
            productId: productId,
            status: status,
            createAt: Date(Date.now()).toString(),
            updateAt: Date(Date.now()).toString(),
        });
        try {
            const saveComment = await comment.save();
            res.status(httpStatus.CREATED).json(saveComment)
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

commentControler.editComment = async (req, res, next) => {
    try {
        const { _id } = req.params;
        console.log(_id)
        const {
            content,
            status,
        } = req.body;
        let commentSaved = await commentModel.findByIdAndUpdate(_id, { 
            content: content,
            status: status, 
            updateAt: Date(Date.now()).toString(),
        }, { new: true });
        if (commentSaved == null) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "comment is null" });
        }
        return res.status(httpStatus.OK).json({
            message: commentSaved
        });
    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

commentControler.deleteComment = async (req, res, next) => {
    try {
        const { _id } = req.params;
        let comment = await commentModel.findByIdAndDelete(_id).exec();
        if(comment == null){
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not find comment"});
        }
        return res.status(httpStatus.ACCEPTED).json({
            message: "DELETE comment SUCCESSFULLY!"
        });
    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

commentControler.getComment = async (req, res, next) => {
    try {
        const { _id } = req.params;
        let comment = await commentModel.find({_id: _id}).exec();
        if(comment == null){
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not find comment"});
        }
        return res.status(httpStatus.ACCEPTED).json({
            message: comment
        });
    } catch {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "BAD_REQUEST"
        });
    }
}

commentControler.show = async (req, res, next) => {
    res.status(200).json({
        message: 'Show comment!'
    });
}

module.exports = commentControler;