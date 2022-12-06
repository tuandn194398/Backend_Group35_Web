const mongoose = require('mongoose');
const accountModel = require('../models/account');
const httpStatus = require('../utils/httpStatus');
const accountController = {};

accountController.signup = async(req, res, next) =>{
    try {
        const {
            email,
            password,
            fullName,
        } = req.body;
        let user = await accountModel.findOne({
            email: email,
        })
        if (user) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'email already exists'
            });
        }

        account = new accountModel({
            email: email,
            password: password,
            fullName: fullName,

        });
        try{
            const savedAccount = await account.save();
            res.status(httpStatus.CREATED).json({
                data: {
                    id: savedAccount._id,
                    email: savedAccount.email,
                    fullName: savedAccount.fullName,
                }
            })
        }catch{
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "BAD_REQUEST"
            });

        }
    }catch{
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "LOST SERVER"
        });

    }
}
accountController.login = async(req, res, next) => {

}
module.exports = accountController;