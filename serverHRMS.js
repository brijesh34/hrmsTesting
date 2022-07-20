require('dotenv').config();
var nodemailer = require('nodemailer');
const express = require("express")
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.set('view engine', 'ejs');










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
   createdBy:String,
   updatedBy:String,
   cr_time:Date,
   up_date:Date
    

})

///////login table with role of Employees
const userSchema5 = new mongoose.Schema({
    emp_id: String,
    // emp_role: String,
    emp_password: String,
    emp_email: String,
    emp_status: String,
   createdBy:String,
   updatedBy:String,
   cr_time:Date,
   up_date:Date
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

     Duration:String,
     createdBy:String,
    updatedBy:String,
    cr_time:Date,
    up_date:Date
})

/////////////////Leave Schema
const userSchema8 = new mongoose.Schema({
    
    
eid: String,
l_id: String,
ename:String,
reportingPerson:String,
l_reason:String,
l_reason2:String,

start_date:Date,
end_date:Date,
l_status:String,
l_type:String,
l_category:String,
approvedBy:String,
createdBy:String,
    updatedBy:String,
    cr_time:Date,
    up_date:Date
})

// eid: userid,
//       l_id: '',
//       ename:uname,
//       reportingPerson:'',
//       l_reason:'',
//       start_date:defaultValue,
//       end_date:null,
//       l_status:'applied'
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
    pdescription: String,
    createdBy:String,
    updatedBy:String,
    cr_time:Date,
    up_date:Date
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
    createdBy:String,
    updatedBy:String,
    cr_time:Date,
    up_date:Date
})
//////Role for employees
const userSchema9 = new mongoose.Schema({
    leaveType_id: String,
    leaveType_name: String,
    createdBy:String,
    updatedBy:String,
    cr_time:Date,
    up_date:Date
    // role_display_name: String,
    // displayName:String

})

//////Category  for employees
const userSchema10 = new mongoose.Schema({
    leaveCategory_id: String,
   leaveCategory_name: String,
   createdBy:String,
   updatedBy:String,
   cr_time:Date,
   up_date:Date
})


//////Role for employees
const userSchema11 = new mongoose.Schema({
    eid: String,
   total_leave:Number,
   leave_in_buck:Number,
   availed_leave:Number,
   lop:Number,
//    createdBy:String,
//    updatedBy:String,
//    cr_time:Date,
   cr_date:Number
})

const EmployeeDetails1 = new mongoose.model("EmpInfo", userSchema2);
const EmployeeDetailsLogin = new mongoose.model("EmpLogin", userSchema5);
const EmployeeRoles = new mongoose.model("EmpRoles", userSchema4);
const ProjectInfo = new mongoose.model("ProjectInfo", userSchema7);
const EmpTimesheet = new mongoose.model("EmpTimesheet", userSchema6);

const LeaveManage = new mongoose.model("LeaveManage", userSchema8);
const LeaveTypes = new mongoose.model("LeaveTypes", userSchema9);
const LeaveCategory = new mongoose.model("LeaveCategory", userSchema10);
const LeaveInfo = new mongoose.model("LeaveInfo", userSchema11);




const sendEmail=(email,subject,data)=>{
    var nodemailer = require('nodemailer');
    var smtpTransport = require("nodemailer-smtp-transport");
    var handlebars = require("handlebars");
    var fs = require("fs");
    
    var readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
          callback(err);
          throw err;
        } else {
          callback(null, html);
        }
      });
    };
    try {
        let mailTransporter = nodemailer.createTransport(
          smtpTransport({
            service: 'gmail',
                host: "gsmtp.gmail.com",
            port: 587,
            requireTLS:true,
            secure: false,
                auth: {
                    user: 'inevitableapptest@gmail.com',
                    pass: 'fiddtnvwktcucugh'
                }
          })
        );
        let htmlFile = "/index.html";
    
        // if (content === "otp") {
        //   htmlFile = "/../../public/code.html";
        // }
        const html="aa";
        //  readHTMLFile(__dirname + "/../public/code.html", function (err, html) {
        readHTMLFile(__dirname + htmlFile, function (err, html) {
          var template = handlebars.compile(html);
          var replacements = {
            verificationcode: "text",
          };
          var htmlToSend = template(replacements);
          var mailOptions = {
            from: 'inevitableapptest@gmail.com',
                to: email,
                subject: subject,
                // text: JSON.stringify(data),
html: htmlToSend,
          };
          mailTransporter.sendMail(mailOptions, function (error, response) {
            if (error) {
              console.log(error);
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    
                    // var transporter = nodemailer.createTransport({
                    //     service: 'gmail',
                    //     host: "gsmtp.gmail.com",
                    // port: 587,
                    // requireTLS:true,
                    // secure: false,
                    //     auth: {
                    //         user: 'inevitableapptest@gmail.com',
                    //         pass: 'fiddtnvwktcucugh'
                    //     }
                    // });
                    // var data = data;
                    // var mailOptions = {
                    //     from: 'inevitableapptest@gmail.com',
                    //     to: email,
                    //     subject: subject,
                    //     text: JSON.stringify(data)
                    // };



                    
                    // transporter.sendMail(mailOptions, function (error, info) {
                    //     if (error) {
                    //         console.log(error);
                    //     } else {
                    //         console.log('Email sent: ' + info.response);
                    //     }
                    // });

}

app.post("/sendPasswordResetLink",  (req, res) => {
    //res.send("my Api  login")
    try {
        const { email } = req.body
        EmployeeDetailsLogin.findOne({ emp_email: email }, (err, employeeDetailsLogin) => {
            if (employeeDetailsLogin) {
                if (email === employeeDetailsLogin.emp_email) {
                    var nodemailer = require('nodemailer');
                    
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        host: "gsmtp.gmail.com",
                    port: 587,
                    requireTLS:true,
                    secure: false,
                        auth: {
                            user: 'inevitableapptest@gmail.com',
                            pass: 'fiddtnvwktcucugh'
                        }
                    });
                    var data = Math.floor(Math.random() * (8000 - 1000) + 1000);
                    var mailOptions = {
                        from: 'inevitableapptest@gmail.com',
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


//                     let testAccount =  nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: 'inevitableapptest@gmail.com', // generated ethereal user
//       pass: 'Info@123', // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info =  transporter.sendMail({
//     from: 'inevitableapptest@gmail.com', // sender address
//     to: email, // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
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
            sys_user

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
                createdBy:sys_user,
   updatedBy:sys_user,
    cr_time:new Date(),
    up_date:new Date()
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




///////////////////add leaves types//////////////
app.post("/register_leaveType", async (req, res) => {
    try {
        const {
            leaveType_id,
            leaveType_name,
            sys_user
        } = req.body;
        console.log(leaveType_id)
        const oldUser = await LeaveTypes.findOne({ leaveType_name });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        else {
            const leaveTypes = new LeaveTypes({
                leaveType_id,
                leaveType_name,
                createdBy:sys_user,
   updatedBy:sys_user,
    cr_time:new Date(),
    up_date:new Date()
                // role_display_name: role_name,
            });
            leaveTypes.save(err => {
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

///////////////////Leave Category//////////////
app.post("/register_leaveCategory", async (req, res) => {
    try {
        const {
            leaveCategory_id,
            leaveCategory_name,
            sys_user
        } = req.body;
        console.log(leaveCategory_id)
        const oldUser = await LeaveCategory.findOne({ leaveCategory_name });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        else {
            const leaveCategory = new LeaveCategory({
                leaveCategory_id,
                leaveCategory_name,
                createdBy:sys_user,
   updatedBy:sys_user,
    cr_time:new Date(),
    up_date:new Date()
                // role_display_name: role_name,
            });
            leaveCategory.save(err => {
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
        const { pid, pname, pstatus, phead, pdescription ,sys_user} = req.body;
        const oldProject = await ProjectInfo.findOne({ pid });
        if (oldProject) {
            return res.sendStatus(409).sendStatus("project is already existed");
        }
        else {
            const projectInfo = new ProjectInfo({
                pid, pname, pstatus, phead, pdescription,
                createdBy:sys_user,
   updatedBy:sys_user,
    cr_time:new Date(),
    up_date:new Date()
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
        Duration,
        sys_user } = req.body;
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
            Duration,
            createdBy:sys_user,
   updatedBy:sys_user,
    cr_time:new Date(),
    up_date:new Date()
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

//////////////////////////////////////////////////////
///////////add New Leave/////////////////
app.post("/register_leave", async (req, res) => {
    try {
        const { 
            eid,l_id,ename,reportingPerson,l_reason,l_reason2,start_date,end_date,l_status
             ,l_type,l_category,userEmail,approvedBy,
             sys_user} = req.body;
        // const oldProject = await ProjectInfo.findOne({ pid });
        // if (oldProject) {
        //     return res.sendStatus(409).sendStatus("project is already existed");
        // }
        // else {
            const leaveManage = new LeaveManage({
                eid,l_id,ename,reportingPerson,l_reason,l_reason2:" ",start_date,end_date,l_status
,l_type,l_category,userEmail,approvedBy,
createdBy:sys_user,
   updatedBy:sys_user,
    cr_time:new Date(),
    up_date:new Date()});
           leaveManage.save(err => {
                if (err) {
                    res.send(err)
                }
                else {
                    sendEmail(reportingPerson,"Leave Request", l_reason);
                    
                    sendEmail(userEmail,"Leave Request send", l_reason);
                    console.log("line no----------------------->399")
                    res.send({ message: "request successfully registered" })
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
            lastCollege,
            sys_user

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
                ReportingManager,
                createdBy:sys_user,
               updatedBy:sys_user,
                cr_time:new Date(),
                up_date:new Date()

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
            sys_user
        } = req.body;
        //  encryptedPassword = await bcrypt.hash(password, 10);           EmployeeDetailsLogin
        const oldUser = await EmployeeDetails1.findOne({ offEmail });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        else {
const doj=new Date(DoJ);
const month=doj.getMonth();
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            const leave = await LeaveInfo.create({
                eid:offId,
                total_leave:(12-month)*2,
                leave_in_buck:2,
                availed_leave:0,
                lop:0,
                cr_date:month
            });


           
            const login = await EmployeeDetailsLogin.create({
                emp_id: offId,
                emp_password: name,
                emp_email: offEmail,

                emp_status: status
            });

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

                createdBy:sys_user,
                updatedBy:sys_user,
                cr_time:new Date(),
                up_date:new Date(),

            });


            user.save(err => {
                if (err) {
                    res.send(err)
                }

                else {
                    leave.save(err => {
                        if (err) {
                            res.send(err)
                        }
        
                        else {
                            console.log("yes it worked-------------------------------line 806");
                            // res.send({ message: "Successfully Resitered" })
                        }
                    }
        
                    )
                    login.save(err => {
                        if (err) {
                            res.send(err)
                            // console.log("xxxxxxxxxxxxxxxxxxxx"+err+"xxxxxxxxxxxxxxxx")
                        }
        
                        else {
                            // res.send({ message: "Successfully Resitered", verify: "true" })
                        }
                    }
        
                    )
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
        const oldUser = await EmployeeDetailsLogin.findOne({offEmail: emp_email });
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

                emp_status: status,
                createdBy:sys_user,
   updatedBy:sys_user,
    cr_time:new Date(),
    up_date:new Date()
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

//////////////////////////////////////////////////////
//////////////////////Leaves Types Details/////////////////
////////////////////////////////////////////////////
app.get("/leaveTypesDetail", async (req, res, next) => {
    try {
        LeaveTypes.find({}, (err, leaveTypes) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(leaveTypes);
            //res.json(employeedetails);
            res.send(leaveTypes);
        })
    } catch (err) {
        console.error(err)
    }

})
//////////////////////////////////////////////////////
//////////////////////Leave Category Details/////////////////
////////////////////////////////////////////////////
app.get("/leaveCategoryDetail", async (req, res, next) => {
    try {
        LeaveCategory.find({}, (err, leaveCategory) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(leaveCategory);
            //res.json(employeedetails);
            res.send(leaveCategory);
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


app.get(`/leaveReport/:id`, async (req, res, next) => {
    try {
        
        const eid=req.params.id;
        console.warn(".................................................................line1087");
           
        // const eid="inv0095";
        // const oldUser = await LeaveInfo.find({ eid:eid });
    
        LeaveInfo.find({eid:eid}, (err, leaveInfo) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(leaveInfo+".................................................................line1096");
            //res.json(employeedetails);
            res.send(leaveInfo);
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
            var ar2=empTimesheet;
           var ar3= ar2.sort(function(a, b){return a.start - b.start});
           var sdate=new Date();
           var dur;
               console.log(ar2+"--------------------------------------------------------------------------------851 line")                   
            ar3.map((data)=>{
                var ndate= new Date(data.start);
                var date=ndate.getFullYear()+'/'+(ndate.getMonth()+1)+'/'+ndate.getDate(); 
                var n2date=new Date(date);
if(sdate!=n2date){
    dur=0;
    console.log(sdate+" ----if- change--- ");
    start_d=new Date(date);
tempar.push({end:data.end,start:start_d,Duration:(data.end-data.start),description:data.description,id:data.id,title:data.title})
           console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; line 873")
                // tempar2.push({end:data.end,start:data.start,Duration:data.Duration,description:data.description,id:data.id,title:data.title})
                 sdate=n2date;
                 dur=data.end-data.start;
                console.log(sdate+" ----if---- ");
         }
        else{
            tempar.map((project, index)=>{
                console.log(project.start+"--line 870")
                
                console.log(n2date+"--line 872")
                if(project.start ===n2date){
                      project.Duration =dur+(project.end-project.start);
                      dur=project.Duration;
                }
           });
            // tempar.push({end:data.end,start:data.start,Duration:data.Duration,description:data.description,id:data.id,title:data.title})
  sdate=date;
  console.log(sdate+" ----else---- ");
        
        } })
            
            // as=tempar;
            console.log( tempar);
            res.send({mess:tempar});
            // res.send({mess:empTimesheet})
  
        })
    
        // EmpTimesheet.find({}, (err, empTimesheet) => {
        //     var arr=new Map([empTimesheet]);
            
        //     var arr=empTimesheet;
        //     const uniqueIds = [];

        //     const unique = arr.filter(element => {
        //       const isDuplicate = uniqueIds.includes(element.start);
            
        //       if (!isDuplicate) {
        //         uniqueIds.push(element.start);
            
        //         return true;
        //       }
            
        //       return false;
        //     });
            
        //     // 👇️ [{id: 1, name: 'Tom'}, {id: 2, name: 'Nick'}]
        //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        //     console.log(unique);
        //     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
            
            

        //     if (err) {
        //         console.warn(err)

        //         return next(err)
        //     }
        //     // console.log(ab.start);
        //     // res.json(empTimesheet);
        //     console.log(typeof empTimesheet);
        //     // console.log(typeof ab);
        //     res.send({mess:empTimesheet});
        // })
    } catch (err) {
        console.error(err)
    }

})
app.get(`/leavesDetail/:id`, async (req, res, next) => {
    try {

const id=req.params.id;
        const tempar=[
            //        {eid:'',l_id:'',ename:'',reportingPerson:'',
            //         l_reason:'',start_date:'',end_date:'',l_status:''
            // ,l_type:'',l_category:''}
                ]   
                LeaveManage.find({reportingPerson:id}).then(function(leaveManage){
                    var ar3=leaveManage;
                   var sdate=new Date();
                    ar3.map((data)=>{
                        var ndate= new Date(data.start_date);
                        var date=(ndate.getMonth()+1)+'/'+ndate.getDate()+'/'+ndate.getFullYear(); 
                        var ndate2= new Date(data.end_date);
                        var date2=(ndate2.getMonth()+1)+'/'+ndate2.getDate()+'/'+ndate2.getFullYear(); 
                       
            tempar.push({ eid:data.eid,l_id:data.l_id,ename:data.ename,reportingPerson:data.reportingPerson,
            l_reason:data.l_reason, l_reason2:data.l_reason2,start_date:date,end_date:date2,l_status:data.l_status
            ,l_type:data.l_type,l_category:data.l_category,s_date:data.start_date,e_date:data.end_date,approvedBy:data.approvedBy})})
        
            res.send({leave:tempar});
         
        })
            
            


        // LeaveManage.find({}, (err, leaveManage) => {
        //     if (err) {
        //         console.warn(err)
        //         return next(err)
        //     }
        //     console.warn(leaveManage);
        //     //res.json(employeedetails);
        //     res.send({leave:leaveManage});
        // })
    } catch (err) {
        console.error(err)
    }

})
app.get(`/leavesDetail_personal/:id`, async (req, res, next) => {
    try {
        const offId=req.params.id;
        const oldUser = await LeaveManage.find({ eid:offId }&&{l_status:"approved"});
    const tempar=[
//        {eid:'',l_id:'',ename:'',reportingPerson:'',
//         l_reason:'',start_date:'',end_date:'',l_status:''
// ,l_type:'',l_category:''}
    ]   
    LeaveManage.find({eid:offId}).then(function(leaveManage){
        var ar3=leaveManage;
       var sdate=new Date();
        ar3.map((data)=>{
            var ndate= new Date(data.start_date);
            var date=ndate.getDate()+'/'+(ndate.getMonth()+1)+'/'+ndate.getFullYear(); 
            var ndate2= new Date(data.end_date);
            var date2=ndate2.getDate()+'/'+(ndate2.getMonth()+1)+'/'+ndate2.getFullYear(); 
           
tempar.push({ eid:data.eid,l_id:data.l_id,ename:data.ename,reportingPerson:data.reportingPerson,
l_reason:data.l_reason,l_reason2:data.l_reason2,start_date:date,end_date:date2,l_status:data.l_status
,l_type:data.l_type,l_category:data.l_category,approvedBy:data.approvedBy})})


res.send({leave:tempar , doj:oldUser.length});

})






        // LeaveManage.find({eid:offId}, (err, leaveManage) => {
        //     if (err) {
        //         console.warn(err)
        //         return next(err)
        //     }
        //     leaves=leaveManage;
        //     //res.json(employeedetails);
        //     res.send({leave:tempar , doj:oldUser.length});
            
        //     // res.send({leave:leaveManage , doj:oldUser.length});
        // })
        // res.send({leave:leaves , doj:"ddddd"});
    
    } catch (err) {
        console.error(err)
    }

})


app.get(`/detail_personal/:id`, async (req, res, next) => {
    try {
        const offId=req.params.id;
        
        EmployeeDetails1.findOne({ offId: offId}, (err, employeedetails1) => {
            if (err) {
                console.warn(err)
                return next(err)
            }
            console.warn(employeedetails1);
            console.log("oooooooooooooo      1181"+employeedetails1);
            res.send(employeedetails1);
   })
        // res.send({leave:leaves , doj:"ddddd"});
    
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
const sys_user=req.body.sys_user;
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

            employeedetails1.createdBy=sys_user;
            employeedetails1.updatedBy=sys_user;
            employeedetails1.cr_time=new Date();
            employeedetails1.up_date=new Date();



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
const sys_user=req.body.sys_user;
        await EmployeeRoles.findOne({ role_id: id }, (err, employeeRoles) => {
            employeeRoles.role_id = id;

            employeeRoles.role_name = name;
            employeeRoles.role_display_name = name;
            employeeRoles.createdBy=sys_user,
            employeeRoles.updatedBy=sys_user,
            employeeRoles.cr_time=new Date(),
            employeeRoles.up_date=new Date(),
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
const sys_user=req.body.sys_user;
        await ProjectInfo.findOne({ pid: pid }, (err, projectInfo) => {
            projectInfo.pid = pid;

            projectInfo.pname = pname;
            projectInfo.pstatus = pstatus;
            projectInfo.phead = phead;
            projectInfo.pdescription = pdescription;
            projectInfo.createdBy=sys_user,
            projectInfo.updatedBy=sys_user,
            projectInfo.cr_time=new Date(),
            projectInfo.up_date=new Date(),
            projectInfo.save();
            res.send("Project info updated");

        });
    }
    catch (err) {
        console.log(err);
    }
})
////////////update monthly
function bachProcess(){
    
 LeaveManage.findOne({  }, (err, leaveInfo) => {
    const l1=leaveInfo.leave_in_buck;
    const l2=leaveInfo.availed_leave;
    // leaveInfo.eid=eid;
    // leaveInfo.total_leave;
    const days =8;
    if(l1<days){
        const a=days-l1;
    leaveInfo.leave_in_buck=0;
    leaveInfo.lop=a+leaveInfo.lop;
    }
    else{

        leaveInfo.leave_in_buck=l1-days;
        leaveInfo.lop=leaveInfo.lop;
    }
    leaveInfo.availed_leave=l2+days;
    const d =new Date();
    cr_date=d.getMonth();
    leaveInfo.save();
    // res.send("leave updated");

});
    }
///////////update yearly
    function  bachProcess2(){
        const d=new Date();
        const dm=d.getMonth()-1;
        const dm2=d.getMonth();
        LeaveInfo.find({}).then(function(leaveInfo){
            var ar3=leaveInfo;
        ar3.map((data)=>{
            
        if((dm==12)&&(dm2==1)){
            LeaveInfo.findOne({eid:data.eid  }, (err, leaveInfo) => {
                const l1=leaveInfo.leave_in_buck;
             const l2=leaveInfo.total_leave;
                // leaveInfo.eid=eid;
                
        // var myquery = { cr_date:12 };
        // var newvalues = {$set: { leave_in_buck:l1+2} };
       
                 leaveInfo.total_leave=l2+24;
                 if(l1>12){

                leaveInfo.leave_in_buck=l1+2+12;
                // leaveInfo.availed_leave=l2+days;
                
        leaveInfo.save();
                 }
                 else{
                    leaveInfo.leave_in_buck=l1+2;
               
        leaveInfo.save();
                 }
                // leaveInfo.collection("customers").updateMany(myquery, newvalues, function(err, res) {
                //     if (err) throw err;
                //     console.log(res.result.nModified + " document(s) updated");
                //     db.close();
                //   });
                // res.send("leave updated");
            
            });
        }
        else{
            LeaveInfo.findOne({eid:data.eid  }, (err, leaveInfo) => {
                const l1=leaveInfo.leave_in_buck;
                // const l2=leaveInfo.availed_leave;
                // leaveInfo.eid;
                // leaveInfo.total_leave;
                leaveInfo.leave_in_buck=l1+2;
                // leaveInfo.availed_leave;
                // var myquery = { cr_date:12 };
                // var newvalues = {$set: { leave_in_buck:l1+2} };
               
                leaveInfo.save();
                // HRMS_database.collection("LeaveManage")
                // leaveInfo.updateMany(myquery, newvalues, function(err, res) {
                //     if (err) throw err;
                //     console.log(res.result.nModified + " document(s) updated");
                //     db.close();
                //   });
            });
            
        }})})
        // LeaveInfo.save();
    
    }
    
// bachProcess2();
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
const sys_user=req.body.sys_user;
        await EmpTimesheet.findOne({ start: start }, (err, empTimesheet) => {

            empTimesheet.emp_id=emp_id;
            empTimesheet.start=start;
            empTimesheet.end=end;
    
            empTimesheet.id=id;
            empTimesheet.title=title;
            empTimesheet.description=description;
            empTimesheet.Duration=Duration;
            empTimesheet.createdBy=sys_user;
            empTimesheet.updatedBy=sys_user;
            empTimesheet.cr_time=new Date();
            empTimesheet.up_date=new Date();
            empTimesheet.save();
            res.send("timesheet info updated");

        });
    }
    catch (err) {
        console.log(err);
    }
})


////////////////////////////////////////
////////update leaveinfo////////////////
////////////////////////////////////////

app.put("/updateLeaveInfo", async (req, res) => {
    try {
        // const  id = req.body.id;
        const eid=req.body.eid;
        const l_id=req.body. l_id;
        const ename=req.body.ename;
        const reportingPerson=req.body.reportingPerson;
        const l_reason=req.body.l_reason;
        const l_reason2=req.body.l_reason2

        const start_date=req.body.start_date;
        const end_date=req.body.end_date;
        const l_status=req.body.l_status;
        const l_type=req.body.l_type;
        const l_category=req.body.l_category;
        const approvedBy=req.body.approvedBy;
        const sys_user=req.body.sys_user;
        const day1=new Date(start_date);
        const day2=new Date(end_date);
        const diff=(day2.getTime()-day1.getTime())/(24*60*60*1000);
const days=Math.abs(Math.round(diff));
// const m=2; EmployeeDetailsLogin
await EmployeeDetailsLogin.findOne({emp_id:eid},(err,employeeDetailsLogin)=>{





console.log(employeeDetailsLogin.emp_email+"-------------------------------------------------line 1863");

        // await 
        LeaveManage.findOne({ l_id: l_id }, (err, leaveManage) => {

        leaveManage.eid=eid;
        leaveManage.l_id=l_id;
        leaveManage.ename=ename;
        leaveManage.reportingPerson=reportingPerson;
        leaveManage.l_reason=l_reason;
        leaveManage.l_reason2=l_reason2

        leaveManage.start_date=start_date;
        leaveManage.end_date=end_date;
        leaveManage.l_status=l_status;
        leaveManage.l_type=l_type;
        leaveManage.l_category=l_category;
   leaveManage.approvedBy=approvedBy;
   leaveManage.createdBy=sys_user;
   leaveManage.updatedBy=sys_user;
   leaveManage.cr_time=new Date();
   leaveManage.up_date=new Date();
        leaveManage.save();
             
// await
if(l_status=="approved")
{ LeaveInfo.findOne({ eid: eid }, (err, leaveInfo) => {
    const l1=leaveInfo.leave_in_buck;
    const l2=leaveInfo.availed_leave;
    leaveInfo.eid=eid;
    // leaveInfo.total_leave;
    if(l1<days){
        const a=days-l1;
    leaveInfo.leave_in_buck=0;
    leaveInfo.lop=a+leaveInfo.lop;
    }
    else{

        leaveInfo.leave_in_buck=l1-days;
        leaveInfo.lop=leaveInfo.lop;
    }
    leaveInfo.availed_leave=l2+days;
    const d =new Date();
    cr_date=d.getMonth();
    leaveInfo.save();
    // res.send("leave updated");

});}

sendEmail(employeeDetailsLogin.emp_email, "Leave is"+l_reason,l_reason2);
sendEmail(reportingPerson, "Leave is"+l_reason,l_reason2)
            res.send("leave  info updated");

        });        });
    }
    catch (err) {
        console.log(err);
    }
})
/* DELETE BOOK */
app.post(`/delete/:id`, async (req, res) => {
    const l_id = req.params.id;
    // await LeaveManage.find({l_id:l_id}).remove();
    await EmployeeDetailsLogin.findOne({emp_id:req.body.eid},(err,employeeDetailsLogin)=>{

    // await
     LeaveManage.deleteOne({l_id:l_id});
    // console.log("------------------->line 1796"+req.body.message);
    sendEmail(employeeDetailsLogin.emp_email, "Leave is","l_reason2");
sendEmail(req.body.reportingPerson, "Leave is","l_reason2")

    res.send("deleted");
})});
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

function ah(){
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkk");
}
const as=1;
const d=new Date();
const dm=d.getMinutes()-1;
const dd=5;
const dm2=d.getMinutes();

// setTimeout(() => {console.log("This is the first function")}, 6000);
// setTimeout(() => {console.log("This is the second function")}, 4000);
setInterval(() => {console.log("This is the final function")

bachProcess2();
}, 2000);
// bachProcess2();
app.listen(port, () => {
    console.log("BE started at port 9005")
})

