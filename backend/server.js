const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


// Handeling Uncaught exception

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("server is shutting down due to uncaught exception");
    process.exit(1);
});


// config
dotenv.config({path: "backend/config/config.env"});

// connecting to database
connectDatabase();


app.listen(process.env.PORT, ()=>{

    console.log(`server is connected successfully on port ${process.env.PORT}`);

});



