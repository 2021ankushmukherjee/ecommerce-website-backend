const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getSingleProduct } = require("../controllers/productController");
const { isAuthenticated, authorizedRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post( isAuthenticated, authorizedRoles("admin"), createProduct);
router.route("/product/id").put( isAuthenticated, authorizedRoles("admin"), updateProduct).delete( isAuthenticated, authorizedRoles("admin"),  deleteProduct).get(getSingleProduct);


module.exports=router;