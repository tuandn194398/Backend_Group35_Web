const accountModel = require('../models/account');
const httpStatus = require('../utils/httpStatus');
const accountController = {};

accountController.signup = async(req, res, next) =>{
    try {
        const {
            email,
            password,
            fullName,
            address,
            phoneNumber,
            dayOfBirth,
        } = req.body;
        let user = await accountModel.findOne({
            email: email,
        })
        if (user) {
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'email already exists'
            });
        }

        const account = new accountModel({
            email: email,
            password: password,
            fullName: fullName,
            address: address,
            phoneNumber: phoneNumber,
            dayOfBirth: dayOfBirth,

        });
        try{
            console.log("creating")
            const savedAccount = await account.save();
            console.log("created")
            res.status(httpStatus.CREATED).json({
                data: {
                    id: savedAccount._id,
                    email: savedAccount.email,
                    fullName: savedAccount.fullName,
                    address: savedAccount.address,
                    phoneNumber: savedAccount.phoneNumber,
                    dayOfBirth: dayOfBirth.dayOfBirth
                }
            })
        }catch{
            return res.status(httpStatus.BAD_REQUEST).json({
                message: "BAD_REQUEST"
            });

        }
    }catch(error){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "LOST SERVER"
        });

    }
}
accountController.login = async(req, res, next) => {
    try{
        const {
            account,
            password
        } = req.body
        const user = await accountModel.findOne({
            email: account
        })

        if(!user){
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Username or password incorect'
            });
        }

        // password
        if(user.password !== password){
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Username or password incorrect'
            });
        }

        //sucess
        return res.status(httpStatus.OK).json({
                data: user
        })


    }catch (e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'error'
        })
    }
}

accountController.changePassword = async(req, res, next) => {
    try{
        let userId = req.body.userId;
        console.log(req.userId)
        let user  = await accountModel.findById(userId);
        if(user == null){
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "UNAUTHORIZED",
                userId: userId
            })
        }
        const {
            currentPassword,
            newPassword
        } = req.body;

        if(currentPassword !== user.password){
            return res.status(httpStatus.BAD_REQUEST).json({
                message: 'Currnent password incorect',
                code: 'CURRENT_PASSWORD_INCORRECT'
            });
        }

        user = await accountModel.findOneAndUpdate({_id:userId}, {
            password: newPassword
        }, {
            new: true,
            runValidators: true
        });
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Can not find user"
            })
        }

        user = await accountModel.findById(userId).select('email fullname phoneNumber');
        return res.status(httpStatus.OK).json({
            data: user
        })
    }catch (e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: e.message,
        });

    }
}
accountController.getUserById = async(req, res, next) => {
    try{
        let userId = req.body.userId;
        let user = await accountModel.findById(userId)
        if(user == null){
            return res.status(httpStatus.NOT_FOUND).json({message: "Can not find"});
        }
        return res.status(httpStatus.OK).json({
            data: user,
        });
    }catch(error){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }

}
accountController.editInfo = async(req, res, next) =>{
    try{
        let userId = req.body.userId;
        let userFind = await accountModel.findById(userId);
        if(userFind == null){
            return res.status(httpStatus.NOT_FOUND).json({
                message:"CAN'T FIND"
            }); 
        }
        const{
            email,
            fullName,
            address,
            phoneNumber,
            dayOfBirth
        } = req.body
        let userSaved = await accountModel.findByIdAndUpdate(userId,{
            email: email,
            fullName: fullName,
            address: address,
            phoneNumber: phoneNumber,
            dayOfBirth: dayOfBirth,
        },{new: true});
        return res.status(httpStatus.OK).json({
            data: userSaved,
        })
    }catch(error){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message
        });
    }
}
accountController.getAllUser= async(req, res, next) => {
    try{
        let users = await accountModel.find()
        return res.status(httpStatus.OK).json({
            data: users,
        });
    }catch(error){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }

}
module.exports = accountController;