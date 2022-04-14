const express = require("express");
const { registerUser, loginUser, logout, forgetPassword, resetPassword, updateUserRole, getUserDetials } = require("../controllers/userController");
const router = express.Router();
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");



router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forget").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticated, getUserDetials);

router.route("/updaterole").put(isAuthenticated, authorizedRoles("admin"), updateUserRole);


module.exports = router;

