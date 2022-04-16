
const fs = require("fs");


// UPLOAD PROFILE IMAGES

exports.userProfileImageUpload = async (req, res) => {


    try {

        const id = req.user.id;

        if (req.files) {


            const file = req.files.profileimage;


            // for define selected file type
            const ext = file.name.split('.');
            //console.log(ext);
            //ext.pop();

            //console.log(ext[1]);

            if (ext[1] !== "jpg" && ext[1] !== "jpeg") {

                return res.status(400).json({ message: "Please upload jpeg only" });
            }

            const fileName =  file.name;

            const path = (__dirname + "/../uploads/profile-images/");


            await file.mv(path + fileName, (err) => {

                if (err) {
                    res.send(err);
                }
                else {

                    fs.renameSync(path + fileName, path + id + "_profile-img.jpeg");

                    res.status(200).json({ message: "Profile image uploaded" });
                }



            });
        }

    }
    catch (err) {

        res.status(400).json({

            success: false,
            message: `cant upload profile image for: - ${err} `
        });
    }


}


// GET PROFILE IMAGES

exports.getProfileImages = async (req, res) => {


    try {

        const id = req.user.id;
       

        const path = (__dirname + "/../uploads/profile-images/");

        const data = fs.readdirSync(path);

        if(data.includes = id + "_profile-img.jpeg" ){

            // const profileImage = ("/home/ankush/Desktop/Coding/node js project/ecommerce-website-backend/backend/" + "uploads/profile-images/" +id + "_profile-img.jpeg")

            const profileImage = (path + id + "_profile-img.jpeg");

            res.sendFile(profileImage);
            
        }
                
       
    }
    catch (err) {

        res.status(400).json({

            success: false,
            message: `cant upload profile image for: - ${err} `
        });
    }


}




// UPLOAD PRODUCT IMAGES

exports.uploadProductImages = async (req, res) => {


    try {

        id = 245;
        console.log(id);

        if (req.files) {


            const file = req.files.productimage;


            // for define selected file type
            const ext = file.name.split('.');
            console.log(ext);
            //ext.pop();

            //console.log(ext[1]);

            if (ext[1] !== "jpg" && ext[1] !== "jpeg") {

                return res.status(400).json({ message: "Please upload jpeg only" });
            }

            const fileName = file.name;

            const path = (__dirname + "/../uploads/product-images/");
            const date = (Date.now().toString() + Math.floor(Math.random() * 1000));


            await file.mv(path + fileName, (err) => {

                if (err) {
                    res.send(err);
                }
                else {

                    fs.renameSync(path + fileName, path + id + "_product-img.jpeg" + date);

                    res.status(200).json({ message: "Product image uploaded" });
                }



            });
        }

    }
    catch (err) {

        res.status(400).json({

            success: false,
            message: `cant upload product image for: - ${err} `
        });
    }


}



