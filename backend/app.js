const express = require("express");
const errorMiddleware = require("./middleware/error");
const app = express();

app.use(express.json());

// Route Imports
const product = require("./routes/productRoutes");

app.use("/api/v1", product);

// middleware for errors

app.use(errorMiddleware);




module.exports=app;

