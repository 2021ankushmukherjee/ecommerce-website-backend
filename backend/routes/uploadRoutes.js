const express = require("express");
const { userProfileImageUpload, uploadProductImages, getProfileImages } = require("../controllers/fileController");
const router = express.Router();
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");




// USER IMAGES ROUTE

router.route("/profileimages").post(isAuthenticated, userProfileImageUpload).get(isAuthenticated, getProfileImages);


// PRODUCT IMAGES ROUTE


router.route("/uploadproductimages").post(isAuthenticated, authorizedRoles("admin"), uploadProductImages);



module.exports = router;