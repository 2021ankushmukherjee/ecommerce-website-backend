const ErrorHandeler = require("../utils/errorHandeler");


module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";


    // Wrong MongoDB Id Error

    if(err.name === "CastError"){

        err = new ErrorHandeler(`Resource not found invalid: ${err.path}`, 400);
    }


    // Mongoose Dublicate key error

    if(err.code === 11000){

        const message = `Dublicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandeler(message, 400);
    }

    // Wrong JWT Error

    if(err.code === "JsonWebTokenError"){

        const message = `Json Web Token is invalid, Try again`
        err = new ErrorHandeler(message, 400);
    }

    // JWT EXPIRE ERROR

    if(err.code === "TokenExpiredError"){

        const message = `Json Web Token is Expired, Try again`
        err = new ErrorHandeler(message, 400);
    }


    res.status(err.statusCode).json({

        success : false,
        message : err.message,
    });
    


}



















