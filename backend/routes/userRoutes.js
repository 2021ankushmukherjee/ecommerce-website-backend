const express = require("express");
const { registerUser, loginUser, logout, forgetPassword } = require("../controllers/userController");
const router = express.Router();



router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forget").post(forgetPassword);


module.exports = router;

