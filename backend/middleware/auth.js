const ErrorHandeler = require("../utils/errorHandeler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


exports.isAuthenticated = async (req,res, next) =>{

    try{
        const {token} = req.cookies;

        if(!token){

            return next(new ErrorHandeler("Please login to access this resource", 401));
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decodedData.id);

        next();


    }   
    catch(err){

        res.status(400).json({

            success: false,
            message: `auth error ${err}`
        });
    }

}   


exports.authorizedRoles = (...roles) => {

    return (req,res,next) =>{

        if(!roles.includes(req.user.role)){

            return next(new ErrorHandeler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }

        next();
    }
}


