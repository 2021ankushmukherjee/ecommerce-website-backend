const express = require("express");
const errorMiddleware = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const upload = require("express-fileupload");



app.use(express.static("./uploads"));

app.use(express.json());
app.use(cookieParser());
app.use(upload());

// Route Imports
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const imageUploads = require("./routes/uploadRoutes");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/static", imageUploads);

// middleware for errors

app.use(errorMiddleware);




module.exports=app;

