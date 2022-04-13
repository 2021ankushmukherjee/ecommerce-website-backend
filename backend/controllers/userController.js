const User = require("../models/userModel");
const ErrorHandeler = require("../utils/errorHandeler");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");


exports.registerUser = async (req, res) => {


    try {

        const { name, email, password } = req.body;

        const user = await User.create({

            name,
            email,
            password,
            avatar: {
                public_id: "this ia apublic id",
                url: "profilepicurl"
            }
        });

        sendToken(user, 201, res);

    }
    catch (err) {

        res.status(400).json({

            success: false,
            message: `cannot create user for ${err}`
        });



    }

}


//LOGIN USER

exports.loginUser = async (req, res, next) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return next(new ErrorHandeler("please enter email & password", 404));
        }

        const user = await User.findOne({ email: email }).select("+password");

        if (!user) {

            return next(new ErrorHandeler("invalid email or password", 401));
        }

        const isPasswordMatched = await user.comparePassword(password);


        if (!isPasswordMatched) {

            return next(new ErrorHandeler("invalid email or password", 401));
        }

        sendToken(user, 200, res);

    }
    catch (err) {

        res.status(400).json({
            success: false,
            message: `Cant login for ${err.message}`
        });

    }
}


// LOGOUT USER

exports.logout = async (req, res, next) => {

    res.cookie("token", null, {

        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({

        success: true,
        message: "Logout successfully"
    });


}



// FORGET PASSWORD

exports.forgetPassword = async (req, res, next) => {

    try {

        const user = await User.findOne({ email: req.body.email });

        if (!user) {

            return next(new ErrorHandeler("User not found", 404));
        }

        // getResetPasswordToken

        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

        const message = `Your password reset token is:-  \n\n ${resetPasswordUrl}`;

        try {

            await sendEmail({

                email: user.email,
                subject: `ecommerce password recovery`,
                message,

            });

            res.status(200).json({

                success: true,
                message: `email send to ${user.email} successfully`
            });


        }
        catch (err) {

            user.resetPasswordToken = undefined;
            user.resetPaswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return next(new ErrorHandeler(err.message, 500 ));
        }

    }
    catch (error) {

        res.status(400).json({
            success: false,
            message: `forget password not working for ${error.message}`
        });

    }

}


// RESET PASSWORD

