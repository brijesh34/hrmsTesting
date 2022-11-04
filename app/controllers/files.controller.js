exports.files = async (req, res) => {
    try {


        const id = req.params.id;

        const fileExists = require('file-exists');
        const fs = require("fs");

        const path = "images/" + id + "_image.png";

        const path1 = "images/" + id + "_image.png";
        const path2 = "images/" + id + "_10marksheet.pdf";
        const path3 = "images/" + id + "_12marksheet.pdf";
        const path4 = "images/" + id + "_graduation.pdf";
        const path5 = "images/" + id + "_postgraduation.pdf";
        const path6 = "images/" + id + "_aadhaar.pdf";
        const path7 = "images/" + id + "_bank.pdf";
        const path8 = "images/" + id + "_pan.pdf";
        const path9 = "images/" + id + "_other.pdf";
        if (fs.existsSync(path)) {
            console.log("exists:", path);
        } else {
            console.log("DOES NOT exist:", path);
        }
        if (fs.existsSync(path1)) {
            // path exists
            f1 = "true";
            console.log("exists:", path);
        } else {
            f1 = "false";
            console.log("DOES NOT exist:", path);
        }
        if (fs.existsSync(path2)) {
            // path exists
            f2 = "true";
            console.log("exists:", path);
        } else {
            f2 = "false";
            console.log("DOES NOT exist:", path);
        }
        if (fs.existsSync(path3)) {
            // path exists
            f3 = "true";
            console.log("exists:", path);
        } else {
            f3 = "false";
            console.log("DOES NOT exist:", path);
        }
        if (fs.existsSync(path4)) {
            // path exists
            f4 = "true";
            console.log("exists:", path);
        } else {
            f4 = "false";
            console.log("DOES NOT exist:", path);
        }
        if (fs.existsSync(path5)) {
            // path exists
            f5 = "true";
            console.log("exists:", path);
        } else {
            f5 = "false";
            console.log("DOES NOT exist:", path);
        }
        if (fs.existsSync(path6)) {
            // path exists
            f6 = "true";
            console.log("exists:", path);
        } else {
            f6 = "false";
            console.log("DOES NOT exist:", path);
        }
        if (fs.existsSync(path7)) {
            // path exists
            f7 = "true";
            console.log("exists:", path);
        } else {
            f7 = "false";
            console.log("DOES NOT exist:", path);
        }
        if (fs.existsSync(path8)) {
            f8 = "true";
            // path exists
            console.log("exists:", path);
        } else {
            f8 = "false";
            console.log("DOES NOT exist:", path);
        }
        if (fs.existsSync(path9)) {
            f9 = "true";
            // path exists
            console.log("exists:", path);
        } else {
            f9 = "false";
            console.log("DOES NOT exist:", path);
        }


        console.log(id) // OUTPUTS: true or false
        // const a=exists;
        res.send({ dat: "true", f1: f1, f2: f2, f3: f3, f4: f4, f5: f5, f6: f6, f7: f7, f8: f8, f9: f9, });

        //   })
    } catch (err) {
        console.error(err)
    }

};
