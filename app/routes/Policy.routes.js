const controller= require("../controllers/policy.controller");
const express = require("express")
const cors = require("cors")

const authJwt = require("../middlewares/authJwt");
const multer = require('multer')
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


// const upload=require("../middlewares/fileUpload");
app.use('/images', express.static('images'));;

const fileStorageEngine = multer.diskStorage({


    destination: (req, file, cb) => {
        try {
            cb(null, './images')
        } catch (err) {
            console.error(err)
        }

    },
    filename: (req, file, cb) => {
        try {
            cb(null, file.originalname)
        } catch (err) {
            console.error(err)
        }
    }

})

const upload = multer({ storage: fileStorageEngine });

module.exports = function (app) {
 app.get("/api/policy/getPolicy", authJwt.verifyToken, controller.getPolicy);
 app.get("/api/policy/viewPolicy", controller.viewPolicy);
 
 
    app.post("/api/policy/addPolicy", upload.single("highschoolPic"),controller.addPolicy);
    app.put("/api/policy/updatePolicy", upload.single("highschoolPic"), controller.updatePolicy);
    app.put("/api/policy/setStatus", controller.setStatus);

};