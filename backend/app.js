const express = require("express");
const errorMiddleware = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");




app.use(express.json());
app.use(cookieParser());


// Route Imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");


app.use("/api/v1", product);
app.use("/api/v1", user);


// middleware for errors

app.use(errorMiddleware);




module.exports=app;

