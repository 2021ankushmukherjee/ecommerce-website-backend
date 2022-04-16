const express = require("express");
const { registerUser, loginUser, logout, forgetPassword, resetPassword, updateUserRole, getUserDetials, updateUserPassword, updateUserProfile, getAllUsers, getSingleUser, deleteUser } = require("../controllers/userController");
const router = express.Router();
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");



router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forget").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticated, getUserDetials);

router.route("/password/update").put(isAuthenticated,  updateUserPassword);

router.route("/me/update").put(isAuthenticated,  updateUserProfile);

router.route("/allusers").get(isAuthenticated, authorizedRoles("admin"), getAllUsers);

router.route("/singleUser").get(isAuthenticated, authorizedRoles("admin"), getSingleUser);

router.route("/deleteuser").delete(isAuthenticated, authorizedRoles("admin"), deleteUser);

router.route("/updaterole").put(isAuthenticated, authorizedRoles("admin"), updateUserRole);


module.exports = router;

