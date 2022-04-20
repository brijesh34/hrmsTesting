//install and import express , cors , mongoose

//import express from "express"
require('dotenv').config();
var nodemailer = require('nodemailer');
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const multer = require('multer')
const jwt = require('jsonwebtoken');
//const res = require("express/lib/response")
//import cors from "cors"
//import mongoose from "mongoose"
// const { API_PORT } = process.env;

const API_PORT  =9005;
const port = process.env.PORT || API_PORT;

//configure
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())



app.use('/images', express.static('images'));
//app.use('/images',express.static('images'));
const fileStorageEngine = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        // cb(null,Date.now()+ '--'+ file.originalname)
        cb(null, file.originalname)
        // cb(null,"brijesh.jpg")    
    }
})

const upload = multer({ storage: fileStorageEngine });

app.post('/employeefiles', upload.single("highschoolPic"), (req, res) => {
    //   profile=(req.file)?req.file.filename:null;
    //console.log(profile);
    console.log(req.data);
    res.send("single file uploadede successfully");
})
app.post("/multiple", upload.array("images", 3),
    (req, res) => {
        console.log(req.files);
        res.send("multiple files upload success");
    });



//create database by mongoose
mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")




});
//schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

//////Role for employees
const userSchema4 = new mongoose.Schema({
role_id: String,
    role_name: String,
    // displayName:String
  
})

///////login table with role of Employees
const userSchema5 = new mongoose.Schema({
    emp_id: String,
    emp_role: String,
    emp_password:String,
    emp_email:String,
    emp_status:String
  
})


/////////////////timesheet
const userSchema6 = new mongoose.Schema({
    emp_id: String,
    logDateTime: Date,
    projectID:String,
    logDuration:String,
    taskDetails:String
  
})
////////////project
const userSchema7 = new mongoose.Schema({
   project_id: String,
   project_role: String,
   project_startDate:Date,
   project_lead:String,
   project_detail:String
  
})




///Employeee Entry form
const userSchema1 = new mongoose.Schema({
    name: String,
    fname: String,
    email: String,
    gender: String,
    offEmail: String,
    offPassword: String,
    offId: String,
    address: String,
    aadhar: String,
    pan: String,
    bankAccount: Number,
    Country: String,
    state: String,
    city: String,
    pincode: Number,
    highestDegree: String,
    lastCollege: String,
    // token: { type: String },


})
///Employeee Entry form
const userSchema2 = new mongoose.Schema({
    // name:String,
    // fname:String,
    // email:String,
    // gender:String,
    // offEmail:String,
    // offPassword:String,
    // offId:String,
    // address:String,
    // aadhar:String,
    // pan:String,
    // bankAccount:Number,
    // Country:String,
    // state:String,
    // city:String,
    // pincode:Number,
    // highestDegree:String,
    // lastCollege:String,
    // token: { type: String },
    name: String,
    fname: String,
    email: String,
    gender: String,
    offEmail: String,
    offId: String,
    address: String,
    aadhaar: String,
    pan: String,
    bankAccount: String,
    bankName: String,
    bankIfsc: String,
    Country: String,
    state: String,
    city: String,
    pincode: String,
    highestDegree: String,
    lastCollegeCompany: String,
    phoneNo: Number,
    jobType: String,
    dob: Date,
    salary: Number,

    noExp: Number,
    status: String,
})

///model
const User = new mongoose.model("User", userSchema)
//const User1=new mongoose.model("User",userSchema1)

///model of employee
const EmployeeDetails = new mongoose.model("EmployeeDetails", userSchema1);
const EmployeeDetails1 = new mongoose.model("EmployeeDetails1", userSchema2);
const EmployeeDetailsLogin = new mongoose.model("EmployeeDetailsLogin", userSchema5);
const EmployeeRoles = new mongoose.model("EmployeeRoles", userSchema4);
const ProjectInfo = new mongoose.model("ProjectInfo", userSchema4);
const EmpTimesheet = new mongoose.model("EmpTimesheet", userSchema4);

// EmployeeDetails.find({}, function(err,user)
// {
//     if(err)console.warn(err)
//     console.warn(user);

// })


//routes

app.post("/sendPasswordResetLink", (req, res) => {
    //res.send("my Api  login")

    const { email } = req.body
    EmployeeDetails.findOne({ email: email }, (err, employeedetails) => {
        if (employeedetails) {
            if (email === employeedetails.email) {
                var nodemailer = require('nodemailer');

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'brijesh@inevitableinfotech.com',
                        pass: 'tjkmzhpqktqvtitq'
                    }
                });
                var data = Math.floor(Math.random() * (8000 - 1000) + 1000);
                var mailOptions = {
                    from: 'brijesh@inevitableinfotech.com',
                    to: email,
                    subject: 'Otp for Reset Password',
                    text: JSON.stringify(data)
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                res.send({ message: "Check Otp on your email", val: data, vemail: employeedetails.email })

            }
            else {
                res.send({ message: " please recheck email and enter again", val: false })
            }
        }
        else {


            res.send({ message: " please recheck email and enter again", val: false })
        }

    })


})

app.post("/login", async (req, res) => {
    //res.send("my Api  login")
    try {
        // Get user input
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const { email, name } = req.body
        const emolpoyeedetails = await EmployeeDetails.findOne({ email: email }, (err, employeedetails) => {
            if (employeedetails) {
                if (name === employeedetails.name) {
                    const name2 = employeedetails.name;
                    const token = jwt.sign(
                        { user_id: employeedetails._id, email, name2 },
                        jwtSecretKey,
                        {
                            expiresIn: "2h",
                        }
                    );
                    //user.token=token;
                    res.send({ message: "Login successfully", user: employeedetails, val: true, val2: token })
                }
                else {
                    res.send({ message: "Invalid credentials, please recheck and enter again", val: false })
                }
            }
            else {


                res.send({ message: "Invalid credentials, please recheck and enter again", val: false })
            }

        })
    } catch (err) {
        console.log(err);
    }


});

//////NEW LOGIN SYSTEM???????????????

app.post("/emplogin", async (req, res) => {
    //res.send("my Api  login")
    try {
        // Get user input
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const { email, password,role } = req.body
        const employeeDetailsLogin = await EmployeeDetailsLogin.findOne({ email: email }, (err, employeeDetailsLogin) => {
            if (employeedetails) {
                if ((password === employeeDetailsLogin.password)&&(role=employeeDetailsLogin.role)) {
                    const name2 = employeeDetailsLogin.role;
                    const token = jwt.sign(
                        { user_id: employeeDetailsLogin._id, email, name2 },
                        jwtSecretKey,
                        {
                            expiresIn: "2h",
                        }
                    );
                    //user.token=token;
                    res.send({ message: "Login successfully", user: employeeDetailsLogin, val: true, val2: token })
                }
                else {
                    res.send({ message: "Invalid credentials, please recheck and enter again", val: false })
                }
            }
            else {


                res.send({ message: "Invalid credentials, please recheck and enter again", val: false })
            }

        })
    } catch (err) {
        console.log(err);
    }


});


/////////////////////////////////////////////////////////////
///////////////REAL HRMS LOGIN//////////////////////////////
///////////////////////////////////////////////////////////
app.post("/loginHrms", async (req, res) => {
    //res.send("my Api  login")
    try {
        // Get user input
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const { email, name } = req.body
        const emolpoyeedetails1 = await EmployeeDetails1.findOne({ email: email }, (err, employeedetails1) => {
            if (employeedetails1) {
                if (name === employeedetails1.name) {
                    const offEmail = employeedetails1.offEmail;
                    const name2 = employeedetails1.name;
                    const jobtype=employeedetails1.jobType;
                    const offId = employeedetails1.offId;
                    const token = jwt.sign(
                        { user_id: employeedetails1._id,offEmail,jobtype, offId ,name2},
                        jwtSecretKey,
                        {
                            expiresIn: "2h",
                        }
                    );
                    //user.token=token;
                    res.send({ message: "Login successfully", user: employeedetails1, val: true, val2: token })
                }
                else {
                    res.send({ message: "Invalid credentials, please recheck and enter again", val: false })
                }
            }
            else {


                res.send({ message: "Invalid credentials, please recheck and enter again", val: false })
            }

        })
    } catch (err) {
        console.log(err);
    }


});
///////////////////add role//////////////
app.post("/register_roles", async (req,res)=>{
//    res.send("my Api register")
const {
    role_id,
    role_name,
    
} = req.body;
console.log(role_id+role_name)
const oldUser = await EmployeeRoles.findOne({ role_name });
if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
}
else {
    //Encrypt user password
    //encryptedPassword = await bcrypt.hash(OffPassword, 10);
    const employeeRoles = new EmployeeRoles({
        role_id,
        role_name,
    
    });

    //console.log(req.file);
    // res.send("single file uploadede successfully")
    employeeRoles.save(err => {
        if (err) {
            res.send(err)
        }

        else {

            res.send({ message: "Successfully Resitered" })
        }
    })
}
})

////add new employee
app.post("/employeedetailsform", async (req, res) => {

    const {
        name,
        fname,
        email,
        gender,
        offEmail,
        offPassword,
        offId,
        address,
        aadhar,
        pan,
        bankAccount,
        Country,
        state,
        city,
        pincode,
        highestDegree,
        lastCollege

    } = req.body;
    const oldUser = await EmployeeDetails.findOne({ email });
    if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
    }
    else {
        //Encrypt user password
        //encryptedPassword = await bcrypt.hash(OffPassword, 10);
        const user = new EmployeeDetails({
            name,
            fname,
            email,
            gender,
            offEmail,
            offPassword,
            offId,
            address,
            aadhar,
            pan,
            bankAccount,
            Country,
            state,
            city,
            pincode,
            highestDegree,
            lastCollege,


        });

        //console.log(req.file);
        // res.send("single file uploadede successfully")
        user.save(err => {
            if (err) {
                res.send(err)
            }

            else {

                res.send({ message: "Successfully Resitered" })
            }
        })
    }
}
    // })


    //}
)




////add new employee
app.post("/employeedetailsform1", async (req, res) => {

    const {
        name,
        fname,
        email,
        gender,
        offEmail,
        offId,
        address,
        aadhaar,
        pan,
        bankAccount,
        bankName,
        bankIfsc,
        Country,
        state,
        city,
        pincode,
        highestDegree,
        lastCollegeCompany,
        phoneNo,
        jobType,
        dob,
        salary,

        noExp,
        status

    } = req.body;
    //  encryptedPassword = await bcrypt.hash(password, 10);           EmployeeDetailsLogin
    const oldUser = await EmployeeDetails1.findOne({ email });
    if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
    }
    else {
        //Encrypt user password
        //encryptedPassword = await bcrypt.hash(OffPassword, 10);
        //encryptedPassword = await bcrypt.hash(password, 10);
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const user = await EmployeeDetails1.create({
            name,
            fname,
            email,
            gender,
            offEmail,
            offId,
            address,
            aadhaar,
            pan,
            bankAccount,
            bankName,
            bankIfsc,
            Country,
            state,
            city,
            pincode,
            highestDegree,
            lastCollegeCompany,
            phoneNo,
            jobType,
            dob,
            salary,

            noExp,
            status,
            // token
            //     : jwt.sign(
            //         { user_id: email },
            //         jwtSecretKey,
            //         {
            //             expiresIn: "2h",
            //         }
            //     )

        });

        const user1 = await EmployeeDetailsLogin.create({
            name,
            offEmail,
            offId,
            status,


        });

         user.save(err => {
            if (err) {
                res.send(err)
            }

            else {
                user1.save();

                res.send({ message: "Successfully Resitered" })
            }
        })
    }
}
    // })


    //}
)



app.post("/employeeDetails", (req, res, next) => {
    EmployeeDetails.find(function (err, employeedetails) {
        if (err) {
            console.warn(err)
            return next(err)
        }
        console.warn(employeedetails);
        res.json(employeedetails);
    })
})



// app.get("/employeeDetail/:id", async (req,res,next)=>{
//     EmployeeDetails.find({},(err,employeedetails)=>{
//         if(err){
//             console.warn(err)
//             return next(err)
//         }
//       //  console.warn(employeedetails);
//         res.json(employeedetails);
//     })
// })

app.get("/employeeDetail", async (req, res, next) => {
    EmployeeDetails.find({}, (err, employeedetails) => {
        if (err) {
            console.warn(err)
            return next(err)
        }
        console.warn(employeedetails);
        //res.json(employeedetails);
        res.send(employeedetails);
    })
})
//////////////////////////////////////////////////////
//////////////////////Role Details/////////////////
////////////////////////////////////////////////////
app.get("/rolesDetail", async (req, res, next) => {
    EmployeeRoles.find({}, (err, employeeRoles) => {
        if (err) {
            console.warn(err)
            return next(err)
        }
        console.warn(employeeRoles);
        //res.json(employeedetails);
        res.send(employeeRoles);
    })
})
app.get("/employeeDetail1", async (req, res, next) => {
    EmployeeDetails1.find({}, (err, employeedetails1) => {
        if (err) {
            console.warn(err)
            return next(err)
        }
        console.warn(employeedetails1);
        //res.json(employeedetails);
        res.send(employeedetails1);
    })
})
app.get("/exemployeeDetail1", async (req, res, next) => {
    const status="Ex-Employee";
    EmployeeDetails1.find({status:status}, (err, employeedetails1) => {
        if (err) {
            console.warn(err)
            return next(err)
        }
        console.warn(employeedetails1);
        //res.json(employeedetails);
        res.send(employeedetails1);
    })
})
app.get("/currentemployeeDetail1", async (req, res, next) => {
    const status="Current";
    EmployeeDetails1.find({status:status}, (err, employeedetails1) => {
        if (err) {
            console.warn(err)
            return next(err)
        }
        console.warn(employeedetails1);
        //res.json(employeedetails);
        res.send(employeedetails1);
    })
})

app.get(`/employeeDetail1/:id`, async (req, res, next) => {
    const id = req.params.id;
    
    EmployeeDetails1.find({email:id}, (err, employeedetails1) => {
        if (err) {
            console.warn(err)
            return next(err)
        }
        console.warn(employeedetails1);
        //res.json(employeedetails);
        res.send({user:employeedetails1});
    })
})


///2nd update
app.put("/updatePassword", async (req, res) => {
    const newFoodName = req.body.password;
    // const newpass =req.body.newpass;

    const id = req.body.id;
    try {
        await EmployeeDetails.findById(id, (err, employeedetails) => {
            employeedetails.name = newFoodName;
            // employeedetails.offPassword=newpass;

            employeedetails.save();
            res.send("Password updated");
        });
    }
    catch (err) {
        console.log(err);
    }
})


//Update details
app.put("/update", async (req, res) => {
    //const newFoodName = req.body.password;
    // const newpass =req.body.newpass;
    const  id = req.body.id;
    const name = req.body.name;
    const fname = req.body.fname;
    const email = req.body.email;
    const gender = req.body.gender;
    const offEmail = req.body.offEmail;
    const  offId = req.body.offId;
    const address = req.body.address;
    const aadhaar = req.body.aadhaar;
    const pan = req.body.pan;
    const bankAccount = req.body.bankAccount;
    const bankName = req.body.bankName;
    const bankIfsc = req.body.bankIfsc;
    const Country = req.body.Country;
    const state = req.body.state;
    const  city = req.body.city;
    const pincode = req.body.pincode;
    const  highestDegree = req.body.highestDegree;
    const lastCollegeCompany = req.body.lastCollegeCompany;
    const phoneNo = req.body.phoneNo;
    const jobType = req.body.jobType;
    const dob = req.body.dob;
    const salary = req.body.salary;

    const noExp = req.body.noExp;
    const status = req.body.status;

    // const id = req.body.id
    try {
        await EmployeeDetails1.findOne({email:id}, (err, employeedetails1) => {
           // employeedetails1.name = newFoodName;
            // employeedetails.offPassword=newpass;


          //  employeedetails1.id=id
            //;
            employeedetails1.name=name
            ;employeedetails1.fname=fname
            ;employeedetails1.email=email
            ;employeedetails1.gender=gender
            ;employeedetails1.offEmail=offEmail
            ;employeedetails1.offId=offId
            ;employeedetails1.address=address
            ;employeedetails1.aadhaar=aadhaar
            ;employeedetails1.pan=pan
            ;employeedetails1.bankAccount=bankAccount
            ;employeedetails1.bankName=bankName
            ;employeedetails1.bankIfsc=bankIfsc
            ;employeedetails1.Country=Country
            ;employeedetails1.state=state
            ;employeedetails1.city=city
            ;employeedetails1.pincode=pincode
            ;employeedetails1.highestDegree=highestDegree
            ;employeedetails1.lastCollegeCompany=lastCollegeCompany
            ;employeedetails1.phoneNo=phoneNo
            ;employeedetails1.jobType=jobType
            ;employeedetails1.dob=dob
            ;employeedetails1.salary=salary
          
            ;employeedetails1.noExp=noExp
           
            ;employeedetails1.status=status
           



            employeedetails1.save();
            res.send("Password updated");
        });
    }
    catch (err) {
        console.log(err);
    }
})
//Update roles
app.put("/updateRoles", async (req, res) => {
    const  id = req.body.id;
    const name = req.body.name;
    try {
        await EmployeeRoles.findOne({role:id}, (err, employeeRoles) => {
           // employeedetails1.name = newFoodName;
            // employeedetails.offPassword=newpass;


            employeeRoles.role_id=id
          ;  
          employeeRoles.role_name=name
           
          employeeRoles.save();
            res.send("Password updated");
        });
    }
    catch (err) {
        console.log(err);
    }
})



/* DELETE BOOK */
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await EmployeeDetails.findByIdAndRemove(id).exec();
    res.send("deleted");
});

const createToken = async () => {
    const token = await jwt.sign({ name: "brijesh" }, "mynameisbrijeshmaurya1234567891011",
        { expiresIn: "20 seconds" });
    console.log(token);

    const userVer = await jwt.verify(token, "mynameisbrijeshmaurya1234567891011");
    console.log(userVer)
}
createToken();

app.listen(port, () => {
    console.log("BE started at port 9005")
})

