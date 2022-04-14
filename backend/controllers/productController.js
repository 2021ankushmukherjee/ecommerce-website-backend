const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandeler = require("../utils/errorHandeler");




// Create a product --Admin
exports.createProduct = async (req, res) => {

    try {

        req.body.user = req.user.id;

        const product = await Product.create(req.body);

        res.status(200).json({

            success: "true",
            product
        });
    }
    catch (err) {

        console.log(err);
        res.status(400).json({
            success: false,
            message: "Product can't Created"
        });
    }

}




// Get All Products
exports.getAllProducts = async (req, res) => {

    try {

        const resultPerPage = 5;
        const productCount = await Product.countDocuments();

        const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

        const products = await apiFeature.query;
        //const products = await Product.find();

        res.status(200).json({

            success: true,
            products,
            productCount,
        });

    }
    catch (err) {

        console.log(err);
        res.status(400).json({

            success: false,
            message: "Cannot get products "
        });

    }

}




//Get Single Products
exports.getSingleProduct = async (req, res, next) => {

    try {
        const product = await Product.findById(req.body.id);


        if (!product) {
            return next(new ErrorHandeler("product not found", 404));

        }

        // if (!product) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Product not found!"
        //     });
        // }

        res.status(200).json({
            success: true,
            product
        });
    }
    catch (err) {

        console.log(err);
        res.status(400).json({

            success: false,
            message: "Cannot get product detials"
        });
    }



}



// Update a Product --Admin
exports.updateProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.body.id);
        //console.log(req.body.id);


        if (!product) {
            return next(new ErrorHandeler("Product not found", 404));

        }


        // if (!product) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Product not found!"
        //     });
        // }

        updateproduct = await Product.findByIdAndUpdate(req.body.id, req.body, { new: true });

        res.status(201).json({
            success: true,
            updateproduct
        });

    }
    catch (err) {

        console.log(err);
        res.status(400).json({
            success: false,
            message: "Cannot update product successfully"
        });



    }

}




// Delete a Product
exports.deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.body.id);


        if (!product) {
            return next(new ErrorHandeler("Product not found", 404));

        }

        // if (!product) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Product not found!"
        //     });
        // }

        await product.remove();

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully"
        });

    }
    catch (err) {

        console.log(err);
        res.status(400).json({

            success: false,
            message: "Product cannot deleted!"
        });
    }


}
