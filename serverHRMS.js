require('dotenv').config();
var nodemailer = require('nodemailer');
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const multer = require('multer')
const jwt = require('jsonwebtoken');

const API_PORT = 9005;
const port = process.env.PORT || API_PORT;

//configure
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())



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

app.post('/employeefiles', upload.single("highschoolPic"), (req, res) => {
    console.log(req.file + "single file uploadede successfully.........................>>>>>>>>>>>>>>>>");
    res.send("single file uploadede successfully.........................>>>>>>>>>>>>>>>>");
})
app.post("/multiple", upload.array("images", 3),
    (req, res) => {
        console.log(req.files);
        res.send("multiple files upload success");
    });



//create database by mongoose
mongoose.connect("mongodb://0.0.0.0:27017/HRMS_Database", {
    useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
    console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
})

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

    role_display_name: String,
    // displayName:String

})

///////login table with role of Employees
const userSchema5 = new mongoose.Schema({
    emp_id: String,
    // emp_role: String,
    emp_password: String,
    emp_email: String,
    emp_status: String

})


/////////////////timesheet
// const userSchema6 = new mongoose.Schema({
//     emp_id: String,
//     logDateTime: Date,
//     projectID:String,
//     logDuration:String,
//     taskDetails:String

// })
const mong=({
    type:String,
})
const mess=mongoose.Schema(
    {
        ad:mong,
    }
)
/////////////////timesheet
const userSchema6 = new mongoose.Schema({
    
    emp_id: String,
    start: Date,
    end: Date,

    id: String,
    title: String,
    description: String,
    ab:[mess],

     Duration:String
})
////////////project
// const userSchema7 = new mongoose.Schema({
//    project_id: String,
//    project_role: String,
//    project_startDate:Date,
//    project_lead:String,
//    project_detail:String

// })

const userSchema7 = new mongoose.Schema({
    pid: String,
    pname: String,
    pstatus: String,
    phead: String,
    pdescription: String

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

    DoJ: Date,
    ReportingManager: String,
})

const EmployeeDetails1 = new mongoose.model("EmpInfo", userSchema2);
const EmployeeDetailsLogin = new mongoose.model("EmpLogin", userSchema5);
const EmployeeRoles = new mongoose.model("EmpRoles", userSchema4);
const ProjectInfo = new mongoose.model("ProjectInfo", userSchema7);
const EmpTimesheet = new mongoose.model("EmpTimesheet", userSchema6);

app.post("/sendPasswordResetLink", (req, res) => {
    //res.send("my Api  login")
    try {
        const { email } = req.body
        EmployeeDetailsLogin.findOne({ emp_email: email }, (err, employeeDetailsLogin) => {
            if (employeeDetailsLogin) {
                if (email === employeeDetailsLogin.emp_email) {
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
                    res.send({ message: "Check Otp on your e-mail , If e-mail is registered ", val: data, vemail: employeeDetailsLogin.email })

                }
                else {
                    res.send({ message: " please recheck email and enter again", val: false })
                }
            }
            else {


                res.send({ message: " please recheck email and enter again", val: false })
            }

        })
    } catch (err) {
        console.error(err)
    }



})


/////////////////////////////////////////////////////////////
///////////////REAL HRMS LOGIN//////////////////////////////
///////////////////////////////////////////////////////////
app.post("/loginHrms", async (req, res) => {
    //res.send("my Api  login")
    try {
        // Get user input
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const { email, password } = req.body;
        const tab = EmployeeDetails1;
        console.log("-----------------------------------email------------------>" + email);
        console.log("-----------------------------------Pass------------------>" + password);
        //////////////////////////////////
        //////////////////////OR property not worked here
        ////////////////////////
        await EmployeeDetailsLogin.findOne(
            { emp_id: email },
            (err, employeedetails1) => {
                console.log("employeedetails1: ", employeedetails1);
                if (employeedetails1) {

                    console.log("292: Pass: ", employeedetails1.emp_password);
                    if (password === employeedetails1.emp_password) {
                        const employeedetails2 = tab.findOne({ offId: email }, (err, employeedetails1) => {

                            const jobtype = employeedetails1.jobType;
                            const role = EmployeeRoles.findOne({ role_name: jobtype }, (err, role) => {
                                const offEmail = employeedetails1.offEmail;
                                const name2 = employeedetails1.name;
                                const jobtype = employeedetails1.jobType;

                                const rolet = role.role_id;


                                const offId = employeedetails1.offId;
                                const token = jwt.sign(
                                    { user_id: employeedetails1._id, offEmail, jobtype, offId, name2, rolet },
                                    jwtSecretKey,
                                    {
                                        expiresIn: "2h",
                                    }
                                );
                                res.send({ message: "Login successfully", user: employeedetails1, val: true, val2: token })

                            });
                        })
                    }
                    else {
                        res.send({ message: "Invalid credentials, please recheck and enter again", val: false })
                    }
                }
                else {


                    res.send({ message: "Invalid credentials, please recheck and enter again", val: false })
                }

            }).clone();
    } catch (err) {
        console.log(err);
    }


});

app.post("/loginHrmsfirst", async (req, res) => {
    try {
        // Get user input
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        const { email, name } = req.body;
        const tab = EmployeeDetailsLogin;
        const employeedetails1 = await tab.findOne({ emp_email: email }, (err, employeedetails1) => {
            if (employeedetails1) {
                if ((name === employeedetails1.emp_password) && (EmployeeDetailsLogin.emp_status == "Current")) {
                    res.send({ message: "Login successfully", val: true })
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
app.post("/register_roles", async (req, res) => {
    try {
        const {
            role_id,
            role_name,

        } = req.body;
        console.log(role_id)
        const oldUser = await EmployeeRoles.findOne({ role_name });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        else {
            const employeeRoles = new EmployeeRoles({
                role_id,
                role_name,
                role_display_name: role_name,
            });
            employeeRoles.save(err => {
                if (err) {
                    res.send(err)
                }

                else {

                    res.send({ message: "Successfully Resitered" })
                }
            })
        }
    } catch (err) {
        console.error(err)
    }

})
//////////////////////////////////////////////////////
///////////add Project/////////////////
app.post("/register_project", async (req, res) => {
    try {
        const { pid, pname, pstatus, phead, pdescription } = req.body;
        const oldProject = await ProjectInfo.findOne({ pid });
        if (oldProject) {
            return res.sendStatus(409).sendStatus("project is already existed");
        }
        else {
            const projectInfo = new ProjectInfo({
                pid, pname, pstatus, phead, pdescription,
            });
            projectInfo.save(err => {
                if (err) {
                    res.send(err)
                }
                else {
                    console.log("line no----------------------->399")
                    res.send({ message: "successfully registered project" })
                }
            })
        }
    }

    catch (err) {
        console.log(err);
    }
})


//////////////////////////////////////////////////////
///////////add timesheet title/////////////////
app.post("/register_title", async (req, res) => {
    try {
        const { emp_id,
            start,
            end,

            id,
        
            title,
        description,
        Duration } = req.body;
        // const old=await EmpTimesheet.findOne({pid});
        // if(oldProject){
        //     return res.sendStatus(409).sendStatus("project is already existed");
        // }
        // else{
        const empTimesheet = new EmpTimesheet({
            emp_id,
            start,
            end,

            id,
            title,
            description,
//             ab:[{
// ad:title,
//             }],
            Duration
        });
        empTimesheet.save(err => {
            if (err) {
                res.send(err)
            }
            else {
                console.log("line no----------------------->440")
                res.send({ message: "successfully registered title" })
            }
        })
        // }
    }

    catch (err) {
        console.log(err);
    }
})


////add new employee
app.post("/employeedetailsform", async (req, res) => {
    try {

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

                DoJ,
                ReportingManager


            });

            user.save(err => {
                if (err) {
                    res.send(err)
                }

                else {

                    res.send({ message: "Successfully Resitered" })
                }
            })
        }
    } catch (err) {
        console.error(err)
    }

}
)




////add new employee
app.post("/employeedetailsform1", async (req, res) => {
    try {
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
            // salary,


            noExp,
            status,

            DoJ,
            ReportingManager,
        } = req.body;
        //  encryptedPassword = await bcrypt.hash(password, 10);           EmployeeDetailsLogin
        const oldUser = await EmployeeDetails1.findOne({ offEmail });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        else {

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
                // salary,

                noExp,
                status,

                DoJ,
                ReportingManager,

            });


            user.save(err => {
                if (err) {
                    res.send(err)
                }

                else {
                    res.send({ message: "Successfully Resitered" })
                }
            }

            )


        }

    } catch (err) {
        console.error(err)
    }

}
)


/////////////////////////////////////////////////////////
//////////////////////////////Login database store////
////////////////////////////////////////////////////////
////add new employee
app.post("/employeedetailsLogin", async (req, res) => {
    try {
        // const {
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
            // salary,

            noExp,
            status,

            DoJ,
            ReportingManager,

        } = req.body;

        ///////////////
        //     emp_id,
        const emp_email = offEmail;
        const oldUser = await EmployeeDetailsLogin.findOne({ emp_email });
        if (oldUser) {
            console.log("xxxxxxxxxxxxxxxxxxxx" + err + "xxxxxxxxxxxxxxxx")
            return res.status(409).send("User Already Exist. Please Login");
        }
        else {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const user = await EmployeeDetailsLogin.create({
                emp_id: offId,
                emp_password: name,
                emp_email: emp_email,

                emp_status: status
            });


            user.save(err => {
                if (err) {
                    res.send(err)
                    // console.log("xxxxxxxxxxxxxxxxxxxx"+err+"xxxxxxxxxxxxxxxx")
                }

                else {
                    res.send({ message: "Successfully Resitered", verify: "true" })
                }
            }

            )
        }
    } catch (err) {
        console.error(err)
    }

}
)



app.post("/employeeDetails", (req, res, next) => {
    try {
        EmployeeDetails.find(function (err, employeedetails) {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(employeedetails);
            res.json(employeedetails);
        })
    } catch (err) {
        console.error(err)
    }

})





app.get("/employeeDetail", (req, res, next) => {
    try {
        EmployeeDetails1.find({}, (err, employeedetails) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(employeedetails);
            //res.json(employeedetails);
            res.send(employeedetails);
        })
    } catch (err) {
        console.error(err)
    }

})
//////////////////////////////////////////////////////
//////////////////////Role Details/////////////////
////////////////////////////////////////////////////
app.get("/rolesDetail", async (req, res, next) => {
    try {
        EmployeeRoles.find({}, (err, employeeRoles) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(employeeRoles);
            //res.json(employeedetails);
            res.send(employeeRoles);
        })
    } catch (err) {
        console.error(err)
    }

})



app.get("/projectDetail", async (req, res, next) => {
    try {
        ProjectInfo.find({}, (err, projectInfo) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(projectInfo);
            //res.json(employeedetails);
            res.send(projectInfo);
        })
    } catch (err) {
        console.error(err)
    }

})



app.get("/timesheetDetails", async (req, res, next) => {
    try {

        const tempar=[{
            end:'', start:'', Duration:'', description:'',id:'',title:''
        },];
        const tempar2=[{
            end:'', start:'', Duration:'', description:'',id:'',title:''
        },];
       
        EmpTimesheet.find().then(function(empTimesheet){
            empTimesheet.map((data)=>{
                var size = Object.keys(tempar).length;
                console.log(size); 
//                            const ar2=empTimesheet.sort();
//                            const ar=ar2;
// for(let i=0;i<size;i++){
//     for(let j;j<size;j++){
//         if(ar2[i]==ar[j]){
//             console.log("--------------"+ar2[i])
//         }
//         else{
//             console.log("00000000000000000000");
//         }
//     }

// }

tempar.push({end:data.end,start:data.start,Duration:data.Duration,description:data.description,id:data.id,title:data.title})
           
                tempar2.push({end:data.end,start:data.start,Duration:data.Duration,description:data.description,id:data.id,title:data.title})
            })
            
            var as=[{
                end:'', start:'', Duration:'', description:'',id:'',title:''
            }];
            // as=tempar;
            console.log(typeof tempar);
            res.send({mess:tempar});
            // res.send({mess:empTimesheet})
  
        })
    
        // EmpTimesheet.createView("manag", {emp_id : 'inv0010' });
        // _manag.find().sort({ id: "003" }).pretty();
        // EmpTimesheet.find({}, (err, empTimesheet) => {
        //     // const ab=new Map([empTimesheet]);


        //     if (err) {
        //         console.warn(err)

        //         return next(err)
        //     }
        //     // console.log(ab.start);
        //     res.json(empTimesheet);
        //     console.log(typeof empTimesheet);
        //     console.log(typeof ab);
        //     // res.send(empTimesheet);
        // })
    } catch (err) {
        console.error(err)
    }

})

app.get("/employeeDetail1", async (req, res, next) => {
    try {
        EmployeeDetails1.find({}, (err, employeedetails1) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(employeedetails1);
            //res.json(employeedetails);
            res.send(employeedetails1);
        })
    } catch (err) {
        console.error(err)
    }

})
app.get("/exemployeeDetail1", async (req, res, next) => {
    try {
        const status = "Ex-Employee";
        EmployeeDetails1.find({ status: status }, (err, employeedetails1) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(employeedetails1);
            //res.json(employeedetails);
            res.send(employeedetails1);
        })
    } catch (err) {
        console.error(err)
    }

})
app.get("/currentemployeeDetail1", async (req, res, next) => {
    try {
        const status = "Current";
        EmployeeDetails1.find({ status: status }, (err, employeedetails1) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(employeedetails1);
            //res.json(employeedetails);
            res.send(employeedetails1);
        })
    } catch (err) {
        console.error(err)
    }

})

app.get(`/employeeDetail1/:id`, async (req, res, next) => {
    try {
        const id = req.params.id;

        const fileExists = require('file-exists');

        EmployeeDetails1.find({ offEmail: id }, (err, employeedetails1) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(employeedetails1);

            fileExists('images/_image.png').then(exists => {
                console.log(exists) // OUTPUTS: true or false
                const a = exists;
                res.send({ user: employeedetails1, dat: exists });

            })
            //res.json(employeedetails);
        })
    } catch (err) {
        console.error(err)
    }

})

app.get(`/employeeFiles/:id`, async (req, res) => {
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

        // console.log("mmmmmmmmmmmmmmmmmmmm"+exists)

        console.log(id) // OUTPUTS: true or false
        // const a=exists;
        res.send({ dat: "true", f1: f1, f2: f2, f3: f3, f4: f4, f5: f5, f6: f6, f7: f7, f8: f8, f9: f9, });

        //   })
    } catch (err) {
        console.error(err)
    }

})


///2nd update
app.put("/updatePassword", async (req, res) => {
    const newuser_HName = req.body.password;

    const id = req.body.id;
    try {
        await EmployeeDetailsLogin.findOne({ emp_email: id }, (err, employeeDetailsLogin) => {
            employeeDetailsLogin.emp_password = newuser_HName;

            employeeDetailsLogin.save();
            res.send("Password updated");
        });
    }
    catch (err) {
        console.log(err);
    }
})


//Update details
app.put("/update", async (req, res) => {
    try {
        // const  id = req.body.id;
        const name = req.body.name;
        const fname = req.body.fname;
        const email = req.body.email;
        const gender = req.body.gender;
        const offEmail = req.body.offEmail;
        const offId = req.body.offId;
        const address = req.body.address;
        const aadhaar = req.body.aadhaar;
        const pan = req.body.pan;
        const bankAccount = req.body.bankAccount;
        const bankName = req.body.bankName;
        const bankIfsc = req.body.bankIfsc;
        const Country = req.body.Country;
        const state = req.body.state;
        const city = req.body.city;
        const pincode = req.body.pincode;
        const highestDegree = req.body.highestDegree;
        const lastCollegeCompany = req.body.lastCollegeCompany;
        const phoneNo = req.body.phoneNo;
        const jobType = req.body.jobType;
        const dob = req.body.dob;
        // const salary = req.body.salary;

        const noExp = req.body.noExp;
        const status = req.body.status;

        const DoJ = req.body.DoJ;
        const ReportingManager = req.body.ReportingManager;
        // const id = req.body.id

        await EmployeeDetails1.findOne({ offEmail: offEmail }, (err, employeedetails1) => {
            employeedetails1.name = name
                ; employeedetails1.fname = fname
                ; employeedetails1.email = email
                ; employeedetails1.gender = gender
                ; employeedetails1.offEmail = offEmail
                ; employeedetails1.offId = offId
                ; employeedetails1.address = address
                ; employeedetails1.aadhaar = aadhaar
                ; employeedetails1.pan = pan
                ; employeedetails1.bankAccount = bankAccount
                ; employeedetails1.bankName = bankName
                ; employeedetails1.bankIfsc = bankIfsc
                ; employeedetails1.Country = Country
                ; employeedetails1.state = state
                ; employeedetails1.city = city
                ; employeedetails1.pincode = pincode
                ; employeedetails1.highestDegree = highestDegree
                ; employeedetails1.lastCollegeCompany = lastCollegeCompany
                ; employeedetails1.phoneNo = phoneNo
                ; employeedetails1.jobType = jobType
                ; employeedetails1.dob = dob
                // ;employeedetails1.salary=salary

                ; employeedetails1.noExp = noExp

                ; employeedetails1.status = status;
            employeedetails1.DoJ = DoJ;
            employeedetails1.ReportingManager = ReportingManager;





            employeedetails1.save();
            EmployeeDetailsLogin.findOne({ emp_email: req.body.offEmail }, (err, employeeDetailsLogin) => {
                ; employeeDetailsLogin.emp_email = offEmail
                    ; employeeDetailsLogin.emp_id = offId
                    ; employeeDetailsLogin.emp_status = status




                employeeDetailsLogin.save();
                res.send("Password updated");
            });
        });
    }
    catch (err) {
        console.log(err);
    }
})
//Update roles
// app.put("/updateRoles", async (req, res) => {
//     try {const  id = req.body.id;
//     const name = req.body.name;
//     console.log("_-_-_-_-_->>>"+id+name);

//         await EmployeeRoles.findOne({role_id:id}, (err, employeeRoles) => {


//             console.warn(employeeRoles);
//             employeeRoles.role_id=id;

//           employeeRoles.role_name=name;
//           employeeRoles.role_display_name=name;
//           employeeRoles.save();
//             res.send("Role updated");
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// })


app.put("/updateR", async (req, res) => {
    try {
        // const  id = req.body.id;
        const id = req.body.id;
        const name = req.body.name;

        await EmployeeRoles.findOne({ role_id: id }, (err, employeeRoles) => {
            employeeRoles.role_id = id;

            employeeRoles.role_name = name;
            employeeRoles.role_display_name = name;
            employeeRoles.save();
            res.send("Role updated");

        });
    }
    catch (err) {
        console.log(err);
    }
})
/////update project
app.put("/updateProject", async (req, res) => {
    try {
        // const  id = req.body.id;
        const pid = req.body.pid;
        const pname = req.body.pname;
        const pstatus = req.body.pstatus;
        const phead = req.body.phead;
        const pdescription = req.body.pdescription;

        await ProjectInfo.findOne({ pid: pid }, (err, projectInfo) => {
            projectInfo.pid = pid;

            projectInfo.pname = pname;
            projectInfo.pstatus = pstatus;
            projectInfo.phead = phead;
            projectInfo.pdescription = pdescription;

            projectInfo.save();
            res.send("Project info updated");

        });
    }
    catch (err) {
        console.log(err);
    }
})
////////////////////////////////////////
////////update timesheet////////////////
////////////////////////////////////////

app.put("/updateTimesheet", async (req, res) => {
    try {
        // const  id = req.body.id;
        // const pid = req.body.pid;
        // const pname = req.body.pname;
        // const pstatus = req.body.pstatus;
        // const phead = req.body.phead;
        // const pdescription = req.body.pdescription;
        const emp_id=req.body.emp_id;
        const start=req.body.start;
        const end=req.body.end;

        const id=req.body.id;
        const title=req.body.title;
        const description=req.body.description;
        const Duration=req.body.Duration;

        await EmpTimesheet.findOne({ start: start }, (err, empTimesheet) => {

            empTimesheet.emp_id=emp_id;
            empTimesheet.start=start;
            empTimesheet.end=end;
    
            empTimesheet.id=id;
            empTimesheet.title=title;
            empTimesheet.description=description;
            empTimesheet.Duration=Duration;
            empTimesheet.save();
            res.send("timesheet info updated");

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
const fs = require("fs");

const path = "images/inv0010brijesh@inevitableinfotech.com_image.png";


try {
    if (fs.existsSync(path)) {
        //file exists
        console.log("esist");
    }
} catch (err) {
    console.error(err)
}
const fileExists = require('file-exists');

fileExists('images/_image.png', (err, exists) => console.log(exists)) // OUTPUTS: true or false

fileExists('images/_image.png').then(exists => {
    console.log(exists) // OUTPUTS: true or false
})

console.log(fileExists.sync('images/_image.png'))


app.get("/", (req, res) => {

    console.log("Try");
    res.send("Welcome!");
})

app.get("/users", async (request, response) => {
    const users = await EmployeeDetails1.find({});

    try {
        response.send(users);
    } catch (error) {
        response.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log("BE started at port 9005")
})

