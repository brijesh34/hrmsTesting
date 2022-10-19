require('dotenv').config();
const db = require("./app/models");
const controller = require("./app/controllers/emp.controller");
const ProjectInfo = db.ProjectInfo;
const AppraisalInfo=db.AppraisalInfo;
const EmployeeDetails1=db.EmployeeDetails1;
const EmployeeDetailsLogin=db.EmployeeDetailsLogin;
const EmployeeRoles=db.EmployeeRoles;
const EmpTimesheet=db.EmpTimesheet;
const LeaveCategory=db.LeaveCategory;
const LeaveInfo=db.LeaveInfo;
const LeaveManage=db.LeaveManage;
const LeaveTypes=db.LeaveTypes;
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
// const userSchema4 = new mongoose.Schema({
//     role_id: String,
//     role_name: String,

//     role_display_name: String,
//     // displayName:String
//    createdBy:String,
//    updatedBy:String,
//    cr_time:Date,
//    up_date:Date
    

// })

///////login table with role of Employees
// const userSchema5 = new mongoose.Schema({
//     emp_id: String,
//     // emp_role: String,
//     emp_password: String,
//     emp_email: String,
//     emp_status: String,
//    createdBy:String,
//    updatedBy:String,
//    cr_time:Date,
//    up_date:Date
// })


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
// const userSchema6 = new mongoose.Schema({
//     tid:String,
//     emp_id: String,
//     start: Date,
//     end: Date,

//     id: String,
//     title: String,
//     description: String,
//     ab:[mess],

//      Duration:String,
//      createdBy:String,
//     updatedBy:String,
//     cr_time:Date,
//     up_date:Date
// })

/////////////////Leave Schema
// const userSchema8 = new mongoose.Schema({
    
    
// eid: String,
// l_id: String,
// ename:String,
// reportingPerson:String,
// l_reason:String,
// l_reason2:String,

// start_date:Date,
// end_date:Date,
// l_status:String,
// l_type:String,
// l_category:String,
// approvedBy:String,
// createdBy:String,
//     updatedBy:String,
//     cr_time:Date,
//     up_date:Date
// })

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

// const userSchema7 = new mongoose.Schema({
//     pid: String,
//     pname: String,
//     pstatus: String,
//     phead: String,
//     pdescription: String,
//     createdBy:String,
//     updatedBy:String,
//     cr_time:Date,
//     up_date:Date
// })



///Employeee Entry form
// const userSchema1 = new mongoose.Schema({
//     name: String,
//     fname: String,
//     email: String,
//     gender: String,
//     offEmail: String,
//     offPassword: String,
//     offId: String,
//     address: String,
//     aadhar: String,
//     pan: String,
//     bankAccount: Number,
//     Country: String,
//     state: String,
//     city: String,
//     pincode: Number,
//     highestDegree: String,
//     lastCollege: String,
//     // token: { type: String },


// })
///Employeee Entry form
// const userSchema2 = new mongoose.Schema({
//     name: String,
//     fname: String,
//     email: String,
//     gender: String,
//     offEmail: String,
//     offId: String,
//     address: String,
//     aadhaar: String,
//     pan: String,
//     bankAccount: String,
//     bankName: String,
//     bankIfsc: String,
//     Country: String,
//     state: String,
//     city: String,
//     pincode: String,
//     highestDegree: String,
//     lastCollegeCompany: String,
//     phoneNo: String,
//     jobType: String,
//     dob: Date,
//     // salary: Number,

//     noExp: Number,
//     status: String,

//     DoJ: Date,
//     ReportingManager: String,
//     createdBy:String,
//     updatedBy:String,
//     cr_time:Date,
//     up_date:Date
// })
//////Role for employees
// const userSchema9 = new mongoose.Schema({
//     leaveType_id: String,
//     leaveType_name: String,
//     createdBy:String,
//     updatedBy:String,
//     cr_time:Date,
//     up_date:Date
//     // role_display_name: String,
//     // displayName:String

// })

// //////Category  for employees
// const userSchema10 = new mongoose.Schema({
//     leaveCategory_id: String,
//    leaveCategory_name: String,
//    createdBy:String,
//    updatedBy:String,
//    cr_time:Date,
//    up_date:Date
// })


//////Role for employees
// const userSchema11 = new mongoose.Schema({
//     eid: String,
//    total_leave:Number,
//    leave_in_buck:Number,
//    availed_leave:Number,
//    lop:Number,
// //    createdBy:String,
// //    updatedBy:String,
// //    cr_time:Date,
//    cr_date:Number
// })
/////Appraisal form/////
// const userSchema12=new mongoose.Schema({
//     aprId:String,
//     EmployeeName: String,
//     ManagerName: String,
//     Designation: String,
//     EmpId: String,
//     doj: Date,

//     department: String,
//     TotalExperience:Number,
//     experience: Number,
//     cycle: String,
//     reviewappariser: String,
//     HrName: String,
//     Lastupdate: Date,
//     status:String,
//     submission_date:String,
//     // ----------------------Domain and Teachnology-------------------------------
//     Dom_Tech_ER_1:Number,
//     Dom_Tech_EC_1:String,
//     Dom_Tech_MR_1:Number,
//     Dom_Tech_MC_1:String,
//     //---------------------- Understanding function and Technology------------------------------------- 
//     Un_fun_ER_1:Number,
//     Un_fun_EC_1:String,
//     Un_fun_MR_1:Number,
//     Un_fun_MC_1:String,
//     //------------------------------Usage of tools-------------------------
//     Usage_Tools_ER_1:Number,
//     Usage_Tools_EC_1:String,
//     Usage_Tools_MR_1:Number,
//     Usage_Tools_MC_1:String,
//     // -------------------------Ability to learn Technology------------------------
//     Ability_learn_ER_1:Number,
//     Ability_learn_EC_1:String,
//     Ability_learn_MR_1:Number,
//     Ability_learn_MC_1:String,

//     procedure_eqality_ER_2:Number,
//     procedure_eqality_EC_2:String,
//     procedure_eqality_MC_2:String,
//     procedure_eqality_MR_2:Number,



//     problem_finding_skill_ER_2:Number,
//     problem_finding_skill_EC_2:String,
//     problem_finding_skill_MR_2:Number,
//     problem_finding_skill_MC_2:String,


//     contribute_mentor_help_ER_3:Number,
//     contribute_mentor_help_EC_3:String,
//     contribute_mentor_help_MC_3:String,
//     contribute_mentor_help_MR_3:Number,

//     professional_relationship_ER_3:Number,
//     professional_relationship_EC_3:String,
//     professional_relationship_MR_3:Number,
//     professional_relationship_MC_3:String,



//     challenges_responsibility_ER_4:Number,
//     challenges_responsibility_EC_4:String,
//     challenges_responsibility_MR_4:Number,
//     challenges_responsibility_MC_4:String,

//     Ideas_knowledge_ER_4:Number,
//     Ideas_knowledge_EC_4:String,
//     Ideas_knowledge_MR_4:Number,
//     Ideas_knowledge_MC_4:String,

//     Listen_understand_info_ER_5:Number,
//     Listen_understand_info_EC_5:String,
//     Listen_understand_info_MR_5:Number,
//     Listen_understand_info_MC_5:String,

//     info_clear_EC_5:String,
//     info_clear_ER_5:Number,
//     info_clear_MC_5:String,
//     info_clear_MR_5:Number,

//     Plan_Schedules_ER_6:Number,
//     Plan_Schedules_EC_6:String,
//     Plan_Schedules_MR_6:Number,
//     Plan_Schedules_MC_6:String,


//     Effective_work_EC_6:String,
//     Effective_work_ER_6:Number,
//     Effective_work_MR_6:Number,
//     Effective_work_MC_6:String,

//     Management_ER_6:Number,
//     Management_EC_6:String,
//     Management_MC_6:String,
//     Management_MR_6:Number,

//     accomplishment_ER_6:Number,
//     accomplishment_MR_6:Number,
//     accomplishment_EC_6:String,
//     accomplishment_MC_6:String,


//     customer_relationship_EC_7:String,
//     customer_relationship_ER_7:Number,
//     customer_relationship_MC_7:String,
//     customer_relationship_MR_7:Number,

//     Depend_reliability_ER_7:Number,
//     Depend_reliability_EC_7:String,
//     Depend_reliability_MR_7:Number,
//     Depend_reliability_MC_7:String,

//     policies_EC_7:String,
//     policies_ER_7:Number,
//     policies_MR_7:Number,
//     policies_MC_7:String,

//     Resilience_ER_7:Number,
//     Resilience_EC_7:String,
//     Resilience_MC_7:String,
//     Resilience_MR_7:Number,

//     semiannual_EC_8:String,
//     semiannual_ER_8:Number,
//     semiannual_MC_8:String,
//     semiannual_MR_8:Number,

//     semiannual2_EC_8:String,
//     semiannual2_ER_8:Number,
//     semiannual2_MC_8:String,
//     semiannual2_MR_8:Number,

//     EC_10_1_3: String,
//     MC_10_1_4: String,
//     EC_10_2_3: String,
//     MC_10_2_4: String,
//     EC_10_3_3: String,
//     MC_10_3_4: String,
//     EC_10_4_3: String,
//     MC_10_4_4: String,
//     EC_10_5_3: String,
//     MC_10_5_4: String,
//     EC_10_6_3: String,
//     MC_10_6_4: String,
//     EC_10_7_3: String,
//     MC_10_7_4: String,
//     EC_10_8_3: String,
//     MC_10_8_4: String,
//     ER_9_1_3: String,
//     EC_9_1_4: String,
//     MR_9_1_5: String,
//     MC_9_1_6: String,
//     ER_9_2_3: String,
//     EC_9_2_4: String,
//     MC_9_2_6: String,
//     MR_9_2_5: String,
//     ER_9_3_3: String,
//     EC_9_3_4: String,
//     MC_9_3_6: String,
//     MR_9_3_5: String,
//     ER_9_4_3: String,
//     EC_9_4_4: String,
//     MC_9_4_6: String,
//     MR_9_4_5: String,
// TER:String,
// TMR:String,
// Taverage:String,
// TavgMR:String,
// EC_over:String,
// MC_over:String,

//     total_average_ER1: Number,
//     total_average_MR1: Number,
//     total_average_ER2: Number,
//     total_average_MR2: Number,

// })
// const EmployeeDetails1 = new mongoose.model("EmpInfo", userSchema2);
// const EmployeeDetailsLogin = new mongoose.model("EmpLogin", userSchema5);
// const EmployeeRoles = new mongoose.model("EmpRoles", userSchema4);
// const ProjectInfo = new mongoose.model("ProjectInfo", userSchema7);
// const EmpTimesheet = new mongoose.model("EmpTimesheet", userSchema6);

// const LeaveManage = new mongoose.model("LeaveManage", userSchema8);
// const LeaveTypes = new mongoose.model("LeaveTypes", userSchema9);
// const LeaveCategory = new mongoose.model("LeaveCategory", userSchema10);
// const LeaveInfo = new mongoose.model("LeaveInfo", userSchema11);

// const AppraisalInfo = new mongoose.model("AppraisalInfo", userSchema12);

require("./app/routes/Emp.routes")(app);


const sendEmail=(email,subject,data)=>{
    var data=data;
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
        let htmlFile = "/public/index.html";
    
        const html="aa";
        //  readHTMLFile(__dirname + "/../public/code.html", function (err, html) {
        readHTMLFile(__dirname + htmlFile, function (err, html) {
          var template = handlebars.compile(html);
          var replacements = {
            verificationcode: data,
          };
          const oldUser =  EmployeeDetails1.findOne({ jobType:"Human Resource" });
    
          var htmlToSend = template(replacements);
          var mailOptions = {
            from: 'inevitableapptest@gmail.com',
                to: email,
                cc:oldUser.offEmail,
                // bcc:email,
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
    

}
const sendEmail2=(email,subject,data,data2)=>{
    // var data=data;
    // var data=data;
    const em=email;
    const dat=subject;
    var nodemailer = require('nodemailer');
    var smtpTransport = require("nodemailer-smtp-transport");
    var handlebars = require("handlebars");
    var fs = require("fs");
    const oldUser =  EmployeeDetails1.findOne({ jobType:"Human Resource" });
    
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
        // let htmlFile = "/secondfromat.html";
    
        let htmlFile = "/public/secondfromat.html";
        // const html="aa";
        //  readHTMLFile(__dirname + "/../public/code.html", function (err, html) {
        readHTMLFile(__dirname + htmlFile, function (err, html) {
          var template = handlebars.compile(html);
          var replacements = {
            verificationcode: dat,
            verificationcode2: em,
            
            verificationcode3: data,
            
            verificationcode4: data2,
          };
          var htmlToSend = template(replacements);
          var mailOptions = {
            from: 'inevitableapptest@gmail.com',
                to: email,
                cc:oldUser.offEmail,
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
    
}

const sendEmail3=(email,subject,email2,email3,data)=>{
    // var data=data;
    // var data=data;
    const em=email;
    const dat=subject;
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
        // let htmlFile = "/secondfromat.html";
    
        let htmlFile = "/public/appraisalFormat.html";
        // const html="aa";
        //  readHTMLFile(__dirname + "/../public/code.html", function (err, html) {
        readHTMLFile(__dirname + htmlFile, function (err, html) {
          var template = handlebars.compile(html);
          var replacements = {
            verificationcode: dat,
            verificationcode2: em,
            
            verificationcode3: data,
            
            // verificationcode4: data2,
          };
          var htmlToSend = template(replacements);
    //       var oldUser =  EmployeeDetails1.findOne({offId:email });
    // const oldUser2 =  EmployeeDetails1.findOne({offId:email2 });
    // const oldUser3 =  EmployeeDetails1.findOne({ offId:email3 });
    
    // const oldUser = await EmployeeDetailsLogin.findOne({ emp_id:eid });
          var mailOptions = {
            from: 'inevitableapptest@gmail.com',
                to: email,
                // cc:oldUser2.offEmail,
                // bcc:oldUser3.offEmail,
                subject: subject,
                // text: JSON.stringify(data),
html: htmlToSend,
          };
          mailTransporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log("this is error at the time of sending"+
                 "email and "+email)
              console.log(error);
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    
}

app.post("/sendPasswordResetLink",  (req, res) => {
    //res.send("my Api  login")
    try {
        const { email } = req.body
        EmployeeDetailsLogin.findOne({ emp_email: email }, (err, employeeDetailsLogin) => {
            if (employeeDetailsLogin) {
                if (email === employeeDetailsLogin.emp_email) {
                    
                    var data = Math.floor(Math.random() * (8000 - 1000) + 1000);
                    sendEmail(email, "Otp for Password Reset",data);
                    
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
            // role_id,
            role_name,
            sys_user

        } = req.body;
        // console.log(role_id)
        const today = new Date();
        const hour=today.getHours();
        const min=today.getMinutes();
      const sec=today.getSeconds();
      const day=today.getDay();
      const mont=today.getMonth();
      const year=today.getFullYear(); 
      
        const oldUser = await EmployeeRoles.findOne({ role_name });
        if (oldUser) {
            // return res.status(409).send("User Already Exist. Please Login");
            res.send({ message2: "Role Already Exist, Try another.", val: false })
        }
        else {
            const employeeRoles = new EmployeeRoles({
                role_id:"rol"+hour+min+sec+day+mont+year,
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

                    res.send({ message: "Successfully Resitered", val2: true })
                }
            })
        }
    } catch (err) {
        console.error(err)
    }

})




///////////////////add leaves types//////////////
// app.post("/register_leaveType", async (req, res) => {
//     try {
//         const {
//             // leaveType_id,
//             leaveType_name,
//             sys_user
//         } = req.body;
//         // console.log(leaveType_id)
//         const today = new Date();
//         const hour=today.getHours();
//         const min=today.getMinutes();
//       const sec=today.getSeconds();
//       const day=today.getDay();
//       const mont=today.getMonth();
//       const year=today.getFullYear(); 
//        const oldUser = await LeaveTypes.findOne({ leaveType_name });
//         if (oldUser) {
//             // return res.status(409).send("User Already Exist. Please Login");
//             res.send({ message2: " Leave Type alredy exist, try another", val: false })
//         }
//         else {
//             const leaveTypes = new LeaveTypes({
//                 leaveType_id:"lev"+hour+min+sec+day+mont+year,
//                 leaveType_name,
//                 createdBy:sys_user,
//    updatedBy:sys_user,
//     cr_time:new Date(),
//     up_date:new Date()
//                 // role_display_name: role_name,
//             });
//             leaveTypes.save(err => {
//                 if (err) {
//                     res.send(err)
//                 }

//                 else {

//                     res.send({ message: "Successfully Resitered", val2: true })
//                 }
//             })
//         }
//     } catch (err) {
//         console.error(err)
//     }

// })

///////////////////Leave Category//////////////
// app.post("/register_leaveCategory", async (req, res) => {
//     try {
//         const {
//             // leaveCategory_id,
//             leaveCategory_name,
//             sys_user
//         } = req.body;
//         const today = new Date();
//         const hour=today.getHours();
//         const min=today.getMinutes();
//       const sec=today.getSeconds();
//       const day=today.getDay();
//       const mont=today.getMonth();
//       const year=today.getFullYear();
//         // console.log(leaveCategory_id)
//         const oldUser = await LeaveCategory.findOne({ leaveCategory_name });
//         if (oldUser) {
//             // return res.status(409).send("User Already Exist. Please Login");
//             res.send({ message2: " Leave Category alredy exist, try another", val: false })
//         }
//         else {
//             const leaveCategory = new LeaveCategory({
//                 leaveCategory_id:"lcat"+hour+min+sec+day+mont+year,
//                 leaveCategory_name,
//                 createdBy:sys_user,
//    updatedBy:sys_user,
//     cr_time:new Date(),
//     up_date:new Date()
//                 // role_display_name: role_name,
//             });
//             leaveCategory.save(err => {
//                 if (err) {
//                     res.send(err)
//                 }

//                 else {

//                     res.send({ message: "Successfully Resitered" , val2: true})
//                 }
//             })
//         }
//     } catch (err) {
//         console.error(err)
//     }

// })
//////////////////////////////////////////////////////
///////////add Project/////////////////
// app.post("/register_project", async (req, res) => {
//     try {
//         const { 
//             // pid,
//              pname, pstatus, phead, pdescription ,sys_user} = req.body;
//              const today = new Date();
//         const hour=today.getHours();
//         const min=today.getMinutes();
//       const sec=today.getSeconds();
//       const day=today.getDay();
//       const mont=today.getMonth();
//       const year=today.getFullYear(); 
//         const oldProject = await ProjectInfo.findOne({pname:pname});
//         if (oldProject) {
//             // return res.sendStatus(409).sendStatus("project is already existed");
//             res.send({ message2: " Project is alredy exist, try another", val: false })
//         }
//         else {
//             const projectInfo = new ProjectInfo({
//                 pid:"proj"+hour+min+sec+day+mont+year,
//                  pname, pstatus, phead, pdescription,
//                 createdBy:sys_user,
//    updatedBy:sys_user,
//     cr_time:new Date(),
//     up_date:new Date()
//             });
//             projectInfo.save(err => {
//                 if (err) {
//                     res.send(err)
//                 }
//                 else {
//                     console.log("line no----------------------->399")
//                     res.send({ message: "successfully registered project", val2: true })
//                 }
//             })
//         }
//     }

//     catch (err) {
//         console.log(err);
//     }
// })


//////////////////////////////////////////////////////
///////////add appraisal/////////////////
// app.post("/register_appraisal", async (req, res) => {
//     try {
//         // AppraisalInfo
//         const { 
//             // pid,
//             // EmployeeName ,
//             // ManagerName ,
//             // Designation ,
//             EmpId ,
//             // doj,
      
//             // department ,
//             // TotalExperience ,
//             // experience ,
//             cycle ,
//             reviewappariser ,
//             HrName ,
//             sys_user,
//       } = req.body;
//     //   const cycle1=cycle;
//       console.log(cycle+".....................................................line 1059");
//              const today = new Date();
//         const hour=today.getHours();
//         const min=today.getMinutes();
//       const sec=today.getSeconds();
//       const day=today.getDay();
//       const mont=today.getMonth();
//       const year=today.getFullYear(); 
//         const oldProject = await AppraisalInfo.findOne({ EmpId });
//         const oldUser = await EmployeeDetails1.findOne({ EmpId });
//         const oldUser3 =await  EmployeeDetails1.findOne({offId:EmpId });
//         const oldUser4 =await  EmployeeDetails1.findOne({offId:reviewappariser });
//         const oldUser5 =await  EmployeeDetails1.findOne({offId:HrName });
//         const em=oldUser3.offEmail;
//         const em2=oldUser4.offEmail;
//         const em3=oldUser5.offEmail;
        
//         const EmployeeNam=oldUser3.name;
//         const ManagerNam=oldUser3.ReportingManager;
//         const Designatio=oldUser3.jobType;
//         // EmpId=oldUser.;
//         // const doh1=
//         const doh =oldUser3.DoJ;
//         const doh_year=doh.getFullYear();
//         const exp=(year-doh_year)+(mont-doh.getMonth());
//         const departmen=oldUser3.department;
//         const experienc=oldUser3.noExp;
//         const TotalExperienc=oldUser3.noExp+exp;
//         // cycle=oldUser.;
//         // reviewappariser=oldUser.;
//         // HrName=oldUser.;
//         const Lastupdate=new Date();
//         if (oldProject&&(oldProject.status=="In Process")) {
//             // return res.sendStatus(409).sendStatus("project is already existed");
//             res.send({ message2: " Appraisal is alredy exist, try another", val: false })
//         }
//         else {
            
//         console.log("==============line 1089"+ em);
//             const appraisalInfo = new AppraisalInfo({
//                 aprId:"aprr"+hour+min+sec+day+mont+year,
//                 EmployeeName:EmployeeNam ,
//                 ManagerName:ManagerNam ,
//                 Designation:Designatio ,
//                 EmpId:EmpId ,
//                 doj:doh,
          
//                 department:departmen ,
//                 TotalExperience:TotalExperienc ,
//                 experience:experienc ,
//                 cycle,
//                 reviewappariser ,
//                 HrName ,
//                 Lastupdate:Lastupdate,
                
//     status:"In Process",
//     submission_date:new Date(),
//                 // ----------------------Domain and Teachnology-------------------------------
             




//                 createdBy:sys_user,
//    updatedBy:sys_user,
//     cr_time:new Date(),
//     up_date:new Date()
//             });
//             appraisalInfo.save(err => {
//                 if (err) {
//                     res.send({ message: "err", val2: true })
//                 }
//                 else {
//                     sendEmail3( em,"Appraisal  of "+EmpId,em2,em3,"Appraisal is started, Please Chaeck on system");

//                     // sendEmail3( em,"subject",em2,em3,"data")
//                     res.send({ message: "successfully registered Appraisal", val2: true })
//                 }
//             })
//         }
//     }

//     catch (err) {
//         console.log(err);
//     }
// })

//////////////////////////////////////////////////////
///////////add timesheet title/////////////////
// app.post("/register_title", async (req, res) => {
//     try {
//         const { emp_id,
//             start,
//             end,

//             id,
        
//             title,
//         description,
//         Duration,
//         sys_user } = req.body;
//         // const old=await EmpTimesheet.findOne({pid});
//         // if(oldProject){
//         //     return res.sendStatus(409).sendStatus("project is already existed");
//         // }
//         // else{
//         const empTimesheet = new EmpTimesheet({
//             tid:new Date(),
//             emp_id,
//             start,
//             end,

//             id,
//             title,
//             description,
// //             ab:[{
// // ad:title,
// //             }],
//             Duration,
//             createdBy:sys_user,
//    updatedBy:sys_user,
//     cr_time:new Date(),
//     up_date:new Date()
//         });
//         empTimesheet.save(err => {
//             if (err) {
//                 res.send(err)
//             }
//             else {
//                 console.log("line no----------------------->440")
//                 res.send({ message: "successfully registered title", val2: true })
//             }
//         })
//         // }
//     }

//     catch (err) {
//         console.log(err);
//     }
// })

//////////////////////////////////////////////////////
///////////add New Leave/////////////////
app.post("/register_leave", async (req, res) => {
    try {
        const { 
            eid,l_id,ename,reportingPerson,l_reason,l_reason2,start_date,end_date,l_status
             ,l_type,l_category,userEmail,approvedBy,
             sys_user} = req.body;
             const eDataS={eid:eid,ename:ename,
                reportingPerson:reportingPerson,l_reason:l_reason,l_reason2:l_reason2,
                start_date:start_date,end_date:end_date
                ,l_type:l_type,l_category:l_category,approvedBy:approvedBy,l_status:l_status
                }
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
                    sendEmail2(reportingPerson,"Leave Request",eDataS,"");
                    
                    sendEmail2(userEmail,"Leave Request send",eDataS,"");
                    console.log("line no----------------------->399")
                    res.send({ message: "Request successfully registered" , val2: true})
                }
            })
        // }
    }

    catch (err) {
        console.log(err);
    }
})


////add new employee
// app.post("/employeedetailsform", async (req, res) => {
//     try {

//         const {
//             name,
//             fname,
//             email,
//             gender,
//             offEmail,
//             offPassword,
//             offId,
//             address,
//             aadhar,
//             pan,
//             bankAccount,
//             Country,
//             state,
//             city,
//             pincode,
//             highestDegree,
//             lastCollege,
//             sys_user

//         } = req.body;
//         const oldUser = await EmployeeDetails.findOne({ email });
//         if (oldUser) {
//             // return res.status(409).send("User Already Exist. Please Login");
//             res.send({ message2: " User alredy exist, Please Login", val: false })
//         }
//         else {
//             //Encrypt user password
//             //encryptedPassword = await bcrypt.hash(OffPassword, 10);
//             const user = new EmployeeDetails({
//                 name,
//                 fname,
//                 email,
//                 gender,
//                 offEmail,
//                 offPassword,
//                 offId,
//                 address,
//                 aadhar,
//                 pan,
//                 bankAccount,
//                 Country,
//                 state,
//                 city,
//                 pincode,
//                 highestDegree,
//                 lastCollege,

//                 DoJ,
//                 ReportingManager,
//                 createdBy:sys_user,
//                updatedBy:sys_user,
//                 cr_time:new Date(),
//                 up_date:new Date()

//             });

//             user.save(err => {
//                 if (err) {
//                     res.send(err)
//                 }

//                 else {

//                     res.send({ message: "Successfully Resitered" , val2: true})
//                 }
//             })
//         }
//     } catch (err) {
//         console.error(err)
//     }

// }
// )




////add new employee
// app.post("/employeedetailsform1", async (req, res) => {
//     try {
//         const {
//             name,
//             fname,
//             email,
//             gender,
//             offEmail,
//             // offId,
//             address,
//             aadhaar,
//             pan,
//             bankAccount,
//             bankName,
//             bankIfsc,
//             Country,
//             state,
//             city,
//             pincode,
//             highestDegree,
//             lastCollegeCompany,
//             phoneNo,
//             jobType,
//             dob,
//             // salary,


//             noExp,
//             status,

//             DoJ,
//             ReportingManager,
//             sys_user
//         } = req.body;
//         //  encryptedPassword = await bcrypt.hash(password, 10);           EmployeeDetailsLogin
//         const oldUser = await EmployeeDetails1.findOne({ offEmail });
//         const oldUser2 = await EmployeeDetails1.find({ });
//         const len=oldUser2.length+1;
//         if (oldUser) {
//             // return res.status(409).send("User Already Exist. Please Login");
//             res.send({ message2: " User alredy exist, Please Login", val: false })
//         }
//         else {
// const doj=new Date(DoJ);
// const month=doj.getMonth();
//             let jwtSecretKey = process.env.JWT_SECRET_KEY;
//             const leave = await LeaveInfo.create({
//                 eid:"inv0"+len,
//                 total_leave:(12-month)*2,
//                 leave_in_buck:2,
//                 availed_leave:0,
//                 lop:0,
//                 cr_date:month
//             });


           
//             const login = await EmployeeDetailsLogin.create({
//                 emp_id: "inv0"+len,
//                 emp_password: name,
//                 emp_email: offEmail,

//                 emp_status: status
//             });

//             const user = await EmployeeDetails1.create({
//                 name,
//                 fname,
//                 email,
//                 gender,
//                 offEmail,
//                 offId:"inv0"+len,
//                 address,
//                 aadhaar,
//                 pan,
//                 bankAccount,
//                 bankName,
//                 bankIfsc,
//                 Country,
//                 state,
//                 city,
//                 pincode,
//                 highestDegree,
//                 lastCollegeCompany,
//                 phoneNo,
//                 jobType,
//                 dob,
//                 // salary,

//                 noExp,
//                 status,

//                 DoJ,
//                 ReportingManager,

//                 createdBy:sys_user,
//                 updatedBy:sys_user,
//                 cr_time:new Date(),
//                 up_date:new Date(),

//             });


//             user.save(err => {
//                 if (err) {
//                     res.send(err)
//                 }

//                 else {
//                     leave.save(err => {
//                         if (err) {
//                             res.send(err)
//                         }
        
//                         else {
//                             console.log("yes it worked-------------------------------line 806");
//                             // res.send({ message: "Successfully Resitered" })
//                         }
//                     }
        
//                     )
//                     login.save(err => {
//                         if (err) {
//                             res.send(err)
//                             // console.log("xxxxxxxxxxxxxxxxxxxx"+err+"xxxxxxxxxxxxxxxx")
//                         }
        
//                         else {
//                             // res.send({ message: "Successfully Resitered", verify: "true" })
//                         }
//                     }
        
//                     )
//                     res.send({ message: "Successfully Resitered" ,dt:user})
//                 }
//             }

//             )


//         }

//     } catch (err) {
//         console.error(err)
//     }

// }
// )


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
                    res.send({ message: "Successfully Resitered", verify: "true" , val2: true})
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
// app.get("/rolesDetail", async (req, res, next) => {
//     try {
//         EmployeeRoles.find({}, (err, employeeRoles) => {
//             if (err) {
//                 console.warn(err)
//                 return next(err)
//             }
//             console.warn(employeeRoles);
//             //res.json(employeedetails);
//             res.send(employeeRoles);
//         })
//     } catch (err) {
//         console.error(err)
//     }

// })

//////////////////////////////////////////////////////
//////////////////////Leaves Types Details/////////////////
////////////////////////////////////////////////////
// app.get("/leaveTypesDetail", async (req, res, next) => {
//     try {
//         LeaveTypes.find({}, (err, leaveTypes) => {
//             if (err) {
//                 console.warn(err)
//                 return next(err)
//             }
//             console.warn(leaveTypes);
//             //res.json(employeedetails);
//             res.send(leaveTypes);
//         })
//     } catch (err) {
//         console.error(err)
//     }

// })


//////////////////////////////////////////////////////
//////////////////////Leave Category Details/////////////////
////////////////////////////////////////////////////
// app.get("/leaveCategoryDetail", async (req, res, next) => {
//     try {
//         LeaveCategory.find({}, (err, leaveCategory) => {
//             if (err) {
//                 console.warn(err)
//                 return next(err)
//             }
//             console.warn(leaveCategory);
//             //res.json(employeedetails);
//             res.send(leaveCategory);
//         })
//     } catch (err) {
//         console.error(err)
//     }

// })

// app.get("/projectDetail", async (req, res, next) => {
//     try {
//         ProjectInfo.find({}, (err, projectInfo) => {
//             if (err) {
//                 console.warn(err)
//                 return next(err)
//             }
//             console.warn(projectInfo);
//             //res.json(employeedetails);
//             res.send(projectInfo);
//         })
//     } catch (err) {
//         console.error(err)
//     }

// })

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



// app.get("/timesheetDetails", async (req, res, next) => {
//     try {
      
//         const tempar=[];
//         const tempar2=[{
//             end:'', start:'', Duration:'', description:'',id:'',title:'',idt:''
//         },];
       
//         EmpTimesheet.find().then(function(empTimesheet){
//             var ar2=empTimesheet;
//            var ar3= ar2.sort(function(a, b){return a.start - b.start});
//            var sdate=new Date();
//            var dur;
//                console.log(ar2+"--------------------------------------------------------------------------------851 line")                   
//             ar3.map((data)=>{
               
//                 var ndate= new Date(data.start);
//                 var date=ndate.getFullYear()+'/'+(ndate.getMonth()+1)+'/'+ndate.getDate(); 
//                 var n2date=new Date(date);
// if(sdate!=n2date){
//     dur=0;
//     console.log(sdate+" ----if- change--- ");
//     start_d=new Date(date);
// tempar.push({end:data.end,start:start_d,Duration:data.tid,description:data.description,id:data.id,title:data.title,idt:data.tid,tid:"data.tid"})
//            console.log(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;; line 873")
//                 // tempar2.push({end:data.end,start:data.start,Duration:data.Duration,description:data.description,id:data.id,title:data.title})
//                  sdate=n2date;
//                  dur=data.end-data.start;
//                 console.log(sdate+" ----if---- ");
//          }
//         else{
//             tempar.map((project, index)=>{
//                 console.log(project.start+"--line 870")
                
//                 console.log(n2date+"--line 872")
//                 if(project.start ===n2date){
//                       project.Duration =dur+(project.end-project.start);
//                       dur=project.Duration;
//                 }
//            });
//             // tempar.push({end:data.end,start:data.start,Duration:data.Duration,description:data.description,id:data.id,title:data.title})
//   sdate=date;
//   console.log(sdate+" ----else---- ");
        
//         } })
            
//             // as=tempar;
//             console.log( tempar);
//             res.send({mess:tempar});
//             // res.send({mess:empTimesheet})
  
//         })
    
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
//     } catch (err) {
//         console.error(err)
//     }

// })
// app.get(`/leavesDetail/:id`, async (req, res, next) => {
//     try {

// const id=req.params.id;
//         const tempar=[
//             //        {eid:'',l_id:'',ename:'',reportingPerson:'',
//             //         l_reason:'',start_date:'',end_date:'',l_status:''
//             // ,l_type:'',l_category:''}
//                 ]   
//                 LeaveManage.find({reportingPerson:id}).then(function(leaveManage){
//                     var ar3=leaveManage;
//                    var sdate=new Date();
//                     ar3.map((data)=>{
//                         var ndate= new Date(data.start_date);
//             var date=ndate.getDate()+'/'+(ndate.getMonth()+1)+'/'+ndate.getFullYear(); 
//             var ndate2= new Date(data.end_date);
//             var date2=ndate2.getDate()+'/'+(ndate2.getMonth()+1)+'/'+ndate2.getFullYear(); 
           
//             tempar.push({ eid:data.eid,l_id:data.l_id,ename:data.ename,reportingPerson:data.reportingPerson,
//             l_reason:data.l_reason, l_reason2:data.l_reason2,start_date:date,end_date:date2,l_status:data.l_status
//             ,l_type:data.l_type,l_category:data.l_category,s_date:data.start_date,e_date:data.end_date,approvedBy:data.approvedBy})})
        
//             res.send({leave:tempar});
         
//         })
            
  
            

//     } catch (err) {
//         console.error(err)
//     }

// })

app.get(`/leavesDetailPending/:id`, async (req, res, next) => {
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
                        if(data.l_status==="pending"){
                        var ndate= new Date(data.start_date);
                        var date=(ndate.getMonth()+1)+'/'+ndate.getDate()+'/'+ndate.getFullYear(); 
                        var ndate2= new Date(data.end_date);
                        var date2=(ndate2.getMonth()+1)+'/'+ndate2.getDate()+'/'+ndate2.getFullYear(); 
                       
            tempar.push({ eid:data.eid,l_id:data.l_id,ename:data.ename,reportingPerson:data.reportingPerson,
            l_reason:data.l_reason, l_reason2:data.l_reason2,start_date:date,end_date:date2,l_status:data.l_status
            ,l_type:data.l_type,l_category:data.l_category,s_date:data.start_date,e_date:data.end_date,approvedBy:data.approvedBy}
            )}})
        
            res.send({leave:tempar});
         
        })
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
,l_type:data.l_type,l_category:data.l_category,s_date:data.start_date,e_date:data.end_date,approvedBy:data.approvedBy})})


res.send({leave:tempar , doj:oldUser.length});

})
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
// app.get("/employeeDetail1", async (req, res, next) => {
//     try {
//         EmployeeDetails1.find({}, (err, employeedetails1) => {
//             if (err) {
//                 console.warn(err)
//                 return next(err)
//             }
//             console.warn(employeedetails1);
//             //res.json(employeedetails);
//             res.send(employeedetails1);
//         })
//     } catch (err) {
//         console.error(err)
//     }

// })
// app.get("/exemployeeDetail1", async (req, res, next) => {
//     try {
//         const status = "Ex-Employee";
//         EmployeeDetails1.find({ status: status }, (err, employeedetails1) => {
//             if (err) {
//                 console.warn(err)
//                 return next(err)
//             }
//             console.warn(employeedetails1);
//             //res.json(employeedetails);
//             res.send(employeedetails1);
//         })
//     } catch (err) {
//         console.error(err)
//     }

// })
// app.get("/currentemployeeDetail1", async (req, res, next) => {
//     try {
//         const status = "Current";
//         EmployeeDetails1.find({ status: status }, (err, employeedetails1) => {
//             if (err) {
//                 console.warn(err)
//                 return next(err)
//             }
//             console.warn(employeedetails1);
//             //res.json(employeedetails);
//             res.send(employeedetails1);
//         })
//     } catch (err) {
//         console.error(err)
//     }

// })
require("./app/routes/Emp.routes")(app);
require("./app/routes/Role.routes")(app);
require("./app/routes/Leave.routes")(app);
require("./app/routes/LeaveInfoSettings.routes")(app);
require("./app/routes/Project.routes")(app);
require("./app/routes/Timesheet.routes")(app);
require("./app/routes/Appraisal.routes")(app);


// app.get("/currentemployeeDetail1",controller.getAllEmp);

// app.get(`/employeeDetail1/:id`, async (req, res, next) => {
//     try {
//         const id = req.params.id;

//         const fileExists = require('file-exists');

//         EmployeeDetails1.find({ offEmail: id }, (err, employeedetails1) => {
//             if (err) {
//                 console.warn(err)
//                 return next(err)
//             }
//             console.warn(employeedetails1);

//             res.send({ user: employeedetails1 });

//         })
//     } catch (err) {
//         console.error(err)
//     }

// })
// app.get(`/appraisalDetail1/:id`, async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const tempar=[
//         ]   
        
//                 AppraisalInfo.find({EmpId:id }, (err, appraisalInfo) => {
//                     if (err) {
//                         console.warn(err)
//                         return next(err)
//                     }
//                     var ar3=appraisalInfo;
//                     ar3.map((data)=>{
//                    if((data.status=="submitted")||(data.status=="appraised")||(data.status=="In Process")){
//                         tempar.push( data)}})
                   
//                     // console.warn(appraisalInfo);
//                     //res.json(employeedetails);
//                     res.send(tempar);
//                 })  
//     } catch (err) {
//         console.error(err)
//     }

// })
app.get(`/appraisalDetailStatus/:id`, async (req, res, next) => {
    try {
        const id = req.params.id;
        var user2;
        const oldUser = await AppraisalInfo.findOne({ reviewappariser:id });
        
        const oldUser2 = await AppraisalInfo.findOne({EmpId:id});
        if(oldUser){
            user2=id
        }
        else{
            user2=""
        }
         await AppraisalInfo.find({EmpId:id}, (err, appraisalInfo) => {
            if (err) {
                console.warn(err)
                // return next(err)
                res.send({ user: "" });
            }
            else{
                var as;
                if(oldUser2){
                    as=oldUser2.EmpId;
                    console.warn(oldUser2.EmpId+"--------------------------line 2216");

                }
                else{
                    as=""
                }
               
            // console.warn(oldUser2.EmpId+"--------------------------line 2216");

            res.send({ user:as,user2:user2});
            }
        })
} catch (err) {
        console.error(err)
    }


})


app.get(`/appraisalDetailStatusPersonal/:id`, async (req, res, next) => {
    try {
        const id = req.params.id;
        var user2;
        const oldUser = await AppraisalInfo.findOne({ reviewappariser:id });
        
        const oldUser2 = await AppraisalInfo.findOne({EmpId:id});
        if(oldUser){
            user2=id
        }
        else{
            user2=""
        }
         await AppraisalInfo.find({EmpId:id}, (err, appraisalInfo) => {
            if (err) {
                console.warn(err)
                // return next(err)
                res.send({ user: "" });
            }
            else{
                var as;
                if(oldUser2){
                    as=oldUser2.status;
                    console.warn(oldUser2.EmpId+"--------------------------line 2216");

                }
                else{
                    as=""
                }
               
            // console.warn(oldUser2.EmpId+"--------------------------line 2216");

            res.send({ user:as,user2:user2,user3:oldUser2});
            }
        })
} catch (err) {
        console.error(err)
    }


})

// app.get("/appraisalDetail1", async (req, res, next) => {
//     try {


//         // AppraisalInfo.find({}, (err, appraisalInfo) => {
//         //     if (err) {
//         //         console.warn(err)
//         //         return next(err)
//         //     }
//         //     console.warn(appraisalInfo);
//         //     //res.json(employeedetails);
//         //     res.send(appraisalInfo);
//         // })
//         const tempar=[
//         ]   
        
//                 AppraisalInfo.find({}, (err, appraisalInfo) => {
//                     if (err) {
//                         console.warn(err)
//                         return next(err)
//                     }
//                     var ar3=appraisalInfo;
//                     ar3.map((data)=>{
//                    if((data.status=="submitted")||(data.status=="appraised")||(data.status=="In Process")){
//                         tempar.push( data)}})
                   
//                     // console.warn(appraisalInfo);
//                     //res.json(employeedetails);
//                     res.send(tempar);
//                 })  
//     } catch (err) {
//         console.error(err)
//     }

// })
// app.get(`/appraisalDetail1Manager/:id`, async (req, res, next) => {
//     try {

// const id=req.params.id;
// // const employee = await AppraisalInfo.find({ reviewappariser:id }&&{status:"submitted"});
// const tempar=[
// ]   

//         AppraisalInfo.find({reviewappariser:id}, (err, appraisalInfo) => {
//             if (err) {
//                 console.warn(err)
//                 return next(err)
//             }
//             var ar3=appraisalInfo;
//             ar3.map((data)=>{
//            if((data.status=="submitted")||(data.status=="appraised")){
//                 tempar.push( data)}})
           
//             // console.warn(appraisalInfo);
//             //res.json(employeedetails);
//             res.send(tempar);
//         })  

//     } catch (err) {
//         console.error(err)
//     }

// })



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
            // res.send("Password updated");
            res.send({ message: " Data updated successfully", val: false, val2: true })
        });
    }
    catch (err) {
        console.log(err);
    }
})


//Update details

app.put(`/updatePersonal/:id`, async (req, res) => {
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
// const oldUser = await EmployeeDetailsLogin.findOne({ emp_email: offEmail });
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
            // EmployeeDetailsLogin.findOne({emp_email: offEmail }, (err, employeeDetailsLogin) => {
            // //     ; 
            // employeeDetailsLogin.emp_email = offEmail
            //         ; employeeDetailsLogin.emp_id = offId
            //         ; 
            //         employeeDetailsLogin.emp_status = status;

            //         employeeDetailsLogin.save();
                // res.send("data updated");
                res.send({ message: " Data updated successfully", val: false, val2: true })
            // });
        });
    }
    catch (err) {
        console.log(err);
    }
})
// app.put("/update", async (req, res) => {
//     try {
//         // const  id = req.body.id;
//         const name = req.body.name;
//         const fname = req.body.fname;
//         const email = req.body.email;
//         const gender = req.body.gender;
//         const offEmail = req.body.offEmail;
//         const offId = req.body.offId;
//         const address = req.body.address;
//         const aadhaar = req.body.aadhaar;
//         const pan = req.body.pan;
//         const bankAccount = req.body.bankAccount;
//         const bankName = req.body.bankName;
//         const bankIfsc = req.body.bankIfsc;
//         const Country = req.body.Country;
//         const state = req.body.state;
//         const city = req.body.city;
//         const pincode = req.body.pincode;
//         const highestDegree = req.body.highestDegree;
//         const lastCollegeCompany = req.body.lastCollegeCompany;
//         const phoneNo = req.body.phoneNo;
//         const jobType = req.body.jobType;
//         const dob = req.body.dob;
//         // const salary = req.body.salary;

//         const noExp = req.body.noExp;
//         const status = req.body.status;

//         const DoJ = req.body.DoJ;
//         const ReportingManager = req.body.ReportingManager;
//         // const id = req.body.id
// const sys_user=req.body.sys_user;
// // const oldUser = await EmployeeDetailsLogin.findOne({ emp_email: offEmail });
//         await EmployeeDetails1.findOne({ offEmail: offEmail }, (err, employeedetails1) => {
//             employeedetails1.name = name
//                 ; employeedetails1.fname = fname
//                 ; employeedetails1.email = email
//                 ; employeedetails1.gender = gender
//                 ; employeedetails1.offEmail = offEmail
//                 ; employeedetails1.offId = offId
//                 ; employeedetails1.address = address
//                 ; employeedetails1.aadhaar = aadhaar
//                 ; employeedetails1.pan = pan
//                 ; employeedetails1.bankAccount = bankAccount
//                 ; employeedetails1.bankName = bankName
//                 ; employeedetails1.bankIfsc = bankIfsc
//                 ; employeedetails1.Country = Country
//                 ; employeedetails1.state = state
//                 ; employeedetails1.city = city
//                 ; employeedetails1.pincode = pincode
//                 ; employeedetails1.highestDegree = highestDegree
//                 ; employeedetails1.lastCollegeCompany = lastCollegeCompany
//                 ; employeedetails1.phoneNo = phoneNo
//                 ; employeedetails1.jobType = jobType
//                 ; employeedetails1.dob = dob
//                 // ;employeedetails1.salary=salary

//                 ; employeedetails1.noExp = noExp

//                 ; employeedetails1.status = status;
//             employeedetails1.DoJ = DoJ;
//             employeedetails1.ReportingManager = ReportingManager;

//             employeedetails1.createdBy=sys_user;
//             employeedetails1.updatedBy=sys_user;
//             employeedetails1.cr_time=new Date();
//             employeedetails1.up_date=new Date();



//             employeedetails1.save();
//             // EmployeeDetailsLogin.findOne({emp_email: offEmail }, (err, employeeDetailsLogin) => {
//             // //     ; 
//             // employeeDetailsLogin.emp_email = offEmail
//             //         ; employeeDetailsLogin.emp_id = offId
//             //         ; 
//             //         employeeDetailsLogin.emp_status = status;

//             //         employeeDetailsLogin.save();
//                 // res.send("data updated");
//                 res.send({ message: " Data updated successfully", val: false , val2: true})
//             // });
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// })
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


// app.put("/updateR", async (req, res) => {
//     try {
//         // const  id = req.body.id;
//         const id = req.body.id;
//         const name = req.body.name;
// const sys_user=req.body.sys_user;
//         await EmployeeRoles.findOne({ role_id: id }, (err, employeeRoles) => {
//             employeeRoles.role_id = id;

//             employeeRoles.role_name = name;
//             employeeRoles.role_display_name = name;
//             employeeRoles.createdBy=sys_user,
//             employeeRoles.updatedBy=sys_user,
//             employeeRoles.cr_time=new Date(),
//             employeeRoles.up_date=new Date(),
//             employeeRoles.save();
//             // res.send("Role updated");
//             res.send({ message: " Data updated successfully", val: false, val2: true })

//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

// app.put("/leaveType", async (req, res) => {
//     try {
//         // const  id = req.body.id;
//         const id = req.body.leaveType_id;
//         const name = req.body.leaveType_name;
// const sys_user=req.body.sys_user;
//         await LeaveTypes.findOne({ leaveType_id: id }, (err, leaveTypes) => {
//             leaveTypes.leaveType_id = id;

//             leaveTypes.leaveType_name = name;
//             leaveTypes.createdBy=sys_user,
//             leaveTypes.updatedBy=sys_user,
//             leaveTypes.cr_time=new Date(),
//             leaveTypes.up_date=new Date(),
//             leaveTypes.save();
//             // res.send("leave type updated");
//             res.send({ message: " Data updated successfully", val: false, val2: true })
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// })
// app.put("/leaveCategory", async (req, res) => {
//     try {
//         // const  id = req.body.id;
//         const id = req.body.leaveCategory_id;
//         const name = req.body.leaveCategory_name;
// const sys_user=req.body.sys_user;
//         await LeaveCategory.findOne({ leaveCategory_id: id }, (err, leaveCategory) => {
//             leaveCategory.leaveCategory_id = id;

//             leaveCategory.leaveCategory_name = name;
//             leaveCategory.leaveCategory_name = name;
//             leaveCategory.createdBy=sys_user,
//             leaveCategory.updatedBy=sys_user,
//             leaveCategory.cr_time=leaveCategory.cr_time,
//             leaveCategory.up_date=new Date(),
//             leaveCategory.save();
//             // res.send("Role updated");
//             res.send({ message: " Data updated successfully", val: false, val2: true })

//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// })


/////update project
// app.put("/updateProject", async (req, res) => {
//     try {
//         // const  id = req.body.id;
//         const pid = req.body.pid;
//         const pname = req.body.pname;
//         const pstatus = req.body.pstatus;
//         const phead = req.body.phead;
//         const pdescription = req.body.pdescription;
// const sys_user=req.body.sys_user;
//         await ProjectInfo.findOne({ pid: pid }, (err, projectInfo) => {
//             projectInfo.pid = pid;

//             projectInfo.pname = pname;
//             projectInfo.pstatus = pstatus;
//             projectInfo.phead = phead;
//             projectInfo.pdescription = pdescription;
//             projectInfo.createdBy=sys_user,
//             projectInfo.updatedBy=sys_user,
//             projectInfo.cr_time=new Date(),
//             projectInfo.up_date=new Date(),
//             projectInfo.save();
//             // res.send("Project info updated");
//             res.send({ message: " Data updated successfully", val: false , val2: true})
//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// })
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
    //     const d=new Date();
    //     const dm=d.getMonth()-1;
    //     const dm2=d.getMonth();
        
        LeaveInfo.find({}).then(function(leaveInfo){
            
       
            var ar3=leaveInfo;
        ar3.map((data)=>{
            const d=new Date();
            const dm=d.getMonth();
            const dm2=d.getMonth()+1;
            const cr_date=d.getMonth();
        if((data.cr_date==12)&&(dm2==1)){
            LeaveInfo.findOne({eid:data.eid}, (err, leaveInfo) => {
                const l1=leaveInfo.leave_in_buck;
             const l2=leaveInfo.total_leave;
                // leaveInfo.eid=eid;
                
        // var myquery = { cr_date:12 };
        // var newvalues = {$set: { leave_in_buck:l1+2} };
       
                 leaveInfo.total_leave=l2+24;
                 leaveInfo.cr_date=dm2;
                 if(l1>12){

                leaveInfo.leave_in_buck=2+12;
                // leaveInfo.availed_leave=l2+days;
                
        // leaveInfo.save();
                 }
                 else{
                    leaveInfo.leave_in_buck=l1+2;
               
        // leaveInfo.save();
                 }
                 leaveInfo.save();
            });
        }
        else if(data.cr_date===dm){
            LeaveInfo.findOne({eid:data.eid  }, (err, leaveInfo) => {
                const l1=leaveInfo.leave_in_buck;
                // const l2=leaveInfo.availed_leave;
                // leaveInfo.eid;
                // leaveInfo.total_leave;
                leaveInfo.leave_in_buck=l1+2;
                leaveInfo.cr_date=dm2;
                leaveInfo.save();
            });
            
        }
    else{

    }
    
    })})
        // LeaveInfo.save();
    
    }
    
// bachProcess2();
////////////////////////////////////////
////////update timesheet////////////////
////////////////////////////////////////

// app.put("/updateTimesheet", async (req, res) => {
//     try {
//         // const  id = req.body.id;
//         // const pid = req.body.pid;
//         // const pname = req.body.pname;
//         // const pstatus = req.body.pstatus;
//         // const phead = req.body.phead;
//         // const pdescription = req.body.pdescription;
//         const emp_id=req.body.emp_id;
//         const start=req.body.start;
//         const end=req.body.end;
// const tid=req.body.tid;
//         const id=req.body.id;
//         const title=req.body.title;
//         const description=req.body.description;
//         const Duration=req.body.Duration;
// const sys_user=req.body.sys_user;
//         await EmpTimesheet.findOne({tid:tid }, (err, empTimesheet) => {

//             empTimesheet.emp_id=emp_id,
//             empTimesheet.start=start,
//             empTimesheet.end=end,
    
//             empTimesheet.id=id,
//             empTimesheet.title=title,
//             empTimesheet.description=description,
//             empTimesheet.Duration=Duration,
//             empTimesheet.createdBy=sys_user,
//             empTimesheet.updatedBy=sys_user,
//             empTimesheet.cr_time=new Date(),
//             empTimesheet.up_date=new Date(),
//             empTimesheet.save();
//             // res.send("timesheet info updated");
//             res.send({ message: " Data updated successfully", val: false , val2: true})

//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// })

////////////////////update Appraisal/////
/////////////////////////////////////////

// app.put("/appraisalUpdate", async (req, res) => {
//     try {
//         const  id = req.body.id;
//         const aprId=req.body.aprId;
//         const EmployeeName = req.body.EmployeeName;
//         const ManagerName = req.body.ManagerName;
//         const Designation = req.body.Designation;
//         const EmpId = req.body.EmpId;
//         const doj = req.body.doj;
//         const status = req.body.status;
 
// const
//   submission_date = req.body.submission_date;
//   const
//         department = req.body.department;
//         const
//         TotalExperience = req.body.TotalExperience;
//         const
//         experience = req.body.experience;
//         const
//         cycle = req.body.cycle;
//         const
//         reviewappariser = req.body.reviewappariser;
//         const
//         HrName = req.body.HrName;
//         const
//         Lastupdate = req.body.Lastupdate;
       
//         // ----------------------Domain and Teachnology----------------------------ab.;
//         const
//         Dom_Tech_ER_1 = req.body.Dom_Tech_ER_1;
//         const
//         Dom_Tech_EC_1 = req.body.Dom_Tech_EC_1;
//         const
//         Dom_Tech_MR_1 = req.body.Dom_Tech_MR_1;
//         const
//         Dom_Tech_MC_1 = req.body.Dom_Tech_MC_1;
//         //---------------------- Understanding function and Technology-----------------------------------ab.;
//         const
//         Un_fun_ER_1 = req.body.Un_fun_ER_1;
//         const
//         Un_fun_EC_1 = req.body.Un_fun_EC_1;
//         const
//         Un_fun_MR_1 = req.body.Un_fun_MR_1;
//         const
//         Un_fun_MC_1 = req.body.Un_fun_MC_1;
//         //------------------------------Usage of tools----------------------ab.;
//         const
//         Usage_Tools_ER_1 = req.body.Usage_Tools_ER_1;
//         const
//         Usage_Tools_EC_1 = req.body.Usage_Tools_EC_1;
//         const
//         Usage_Tools_MR_1 = req.body.Usage_Tools_MR_1;
//         const
//         Usage_Tools_MC_1 = req.body.Usage_Tools_MC_1;
//         // -------------------------Ability to learn Technology---------------------ab.;
//         const
//         Ability_learn_ER_1 = req.body.Ability_learn_ER_1;
//         const
//         Ability_learn_EC_1 = req.body.Ability_learn_EC_1;
//         const
//         Ability_learn_MR_1 = req.body.Ability_learn_MR_1;
//         const
//         Ability_learn_MC_1 = req.body.Ability_learn_MC_1;
       
// const
//         procedure_eqality_ER_2 = req.body.procedure_eqality_ER_2;
//         const
//         procedure_eqality_EC_2 = req.body.procedure_eqality_EC_2;
//         const
//         procedure_eqality_MC_2 = req.body.procedure_eqality_MC_2;
//         const
//         procedure_eqality_MR_2 = req.body.procedure_eqality_MR_2;
       
// const
//         problem_finding_skill_ER_2 = req.body.problem_finding_skill_ER_2;
//         const
//         problem_finding_skill_EC_2 = req.body.problem_finding_skill_EC_2;
//         const
//         problem_finding_skill_MR_2 = req.body.problem_finding_skill_MR_2;
//         const
//         problem_finding_skill_MC_2 = req.body.problem_finding_skill_MC_2;
       
// const
//         contribute_mentor_help_ER_3 = req.body.contribute_mentor_help_ER_3;
//         const
//         contribute_mentor_help_EC_3 = req.body.contribute_mentor_help_EC_3;
//         const
//         contribute_mentor_help_MC_3 = req.body.contribute_mentor_help_MC_3;
//         const
//         contribute_mentor_help_MR_3 = req.body.contribute_mentor_help_MR_3;
       
// const
//         professional_relationship_ER_3 = req.body.professional_relationship_ER_3;
//         const
//         professional_relationship_EC_3 = req.body.professional_relationship_EC_3;
//         const
//         professional_relationship_MR_3 = req.body.professional_relationship_MR_3;
//         const
//         professional_relationship_MC_3 = req.body.professional_relationship_MC_3;
       
// const
//         challenges_responsibility_ER_4 = req.body.challenges_responsibility_ER_4;
//         const
//         challenges_responsibility_EC_4 = req.body.challenges_responsibility_EC_4;
//         const
//         challenges_responsibility_MR_4 = req.body.challenges_responsibility_MR_4;
//         const
//         challenges_responsibility_MC_4 = req.body.challenges_responsibility_MC_4;
       
// const
//         Ideas_knowledge_ER_4 = req.body.Ideas_knowledge_ER_4;
//         const
//         Ideas_knowledge_EC_4 = req.body.Ideas_knowledge_EC_4;
//         const
//         Ideas_knowledge_MR_4 = req.body.Ideas_knowledge_MR_4;
//         const
//         Ideas_knowledge_MC_4 = req.body.Ideas_knowledge_MC_4;
       
// const
//         Listen_understand_info_ER_5 = req.body.Listen_understand_info_ER_5;
//         const
//         Listen_understand_info_EC_5 = req.body.Listen_understand_info_EC_5;
//         const
//         Listen_understand_info_MR_5 = req.body.Listen_understand_info_MR_5;
//         const
//         Listen_understand_info_MC_5 = req.body.Listen_understand_info_MC_5;
       
// const
//         info_clear_EC_5 = req.body.info_clear_EC_5;
//         const
//         info_clear_ER_5 = req.body.info_clear_ER_5;
//         const
//         info_clear_MC_5 = req.body.info_clear_MC_5;
//         const
//         info_clear_MR_5 = req.body.info_clear_MR_5;
       
// const
//         Plan_Schedules_ER_6 = req.body.Plan_Schedules_ER_6;
//         const
//         Plan_Schedules_EC_6 = req.body.Plan_Schedules_EC_6;
//         const
//         Plan_Schedules_MR_6 = req.body.Plan_Schedules_MR_6;
//         const
//         Plan_Schedules_MC_6 = req.body.Plan_Schedules_MC_6;
       
// const
//         Effective_work_EC_6 = req.body.Effective_work_EC_6;
//         const
//         Effective_work_ER_6 = req.body.Effective_work_ER_6;
//         const
//         Effective_work_MR_6 = req.body.Effective_work_MR_6;
//         const
//         Effective_work_MC_6 = req.body.Effective_work_MC_6;
       
// const
//         Management_ER_6 = req.body.Management_ER_6;
//         const
//         Management_EC_6 = req.body.Management_EC_6;
//         const
//         Management_MC_6 = req.body.Management_MC_6;
//         const
//         Management_MR_6 = req.body.Management_MR_6;
       
// const
//         accomplishment_ER_6 = req.body.accomplishment_ER_6;
//         const
//         accomplishment_MR_6 = req.body.accomplishment_MR_6;
//         const
//         accomplishment_EC_6 = req.body.accomplishment_EC_6;
//         const
//         accomplishment_MC_6 = req.body.accomplishment_MC_6;
      
// const
//         customer_relationship_EC_7 = req.body.customer_relationship_EC_7;
//         const
//         customer_relationship_ER_7 = req.body.customer_relationship_ER_7;
//         const
//         customer_relationship_MC_7 = req.body.customer_relationship_MC_7;
//         const
//         customer_relationship_MR_7 = req.body.customer_relationship_MR_7;
      
// const
//         Depend_reliability_ER_7 = req.body.Depend_reliability_ER_7;
//         const
//         Depend_reliability_EC_7 = req.body.Depend_reliability_EC_7;
//         const
//         Depend_reliability_MR_7 = req.body.Depend_reliability_MR_7;
//         const
//         Depend_reliability_MC_7 = req.body.Depend_reliability_MC_7;
      
// const
//         policies_EC_7 = req.body.policies_EC_7;
//         const
//         policies_ER_7 = req.body.policies_ER_7;
//         const
//         policies_MR_7 = req.body.policies_MR_7;
//         const
//         policies_MC_7 = req.body.policies_MC_7;
      
// const
//         Resilience_ER_7 = req.body.Resilience_ER_7;
//         const
//         Resilience_EC_7 = req.body.Resilience_EC_7;
//         const
//         Resilience_MC_7 = req.body.Resilience_MC_7;
//         const
//         Resilience_MR_7 = req.body.Resilience_MR_7;
      
// const
//         semiannual_EC_8 = req.body.semiannual_EC_8;
//         const
//         semiannual_ER_8 = req.body.semiannual_ER_8;
//         const
//         semiannual_MC_8 = req.body.semiannual_MC_8;
//         const
//         semiannual_MR_8 = req.body.semiannual_MR_8;
      
// const
//         semiannual2_EC_8 = req.body.semiannual2_EC_8;
//         const
//         semiannual2_ER_8 = req.body.semiannual2_ER_8;
//         const
//         semiannual2_MC_8 = req.body.semiannual2_MC_8;
//         const
//         semiannual2_MR_8 = req.body.semiannual2_MR_8;
      
// const
//         EC_10_1_3 = req.body.EC_10_1_3;
//         const
//         MC_10_1_4 = req.body.MC_10_1_4;
      
// const
//         EC_10_2_3 = req.body.EC_10_2_3;
//         const
//         MC_10_2_4 = req.body.MC_10_2_4;
      
// const
//         EC_10_3_3 = req.body.EC_10_3_3;
//         const
//         MC_10_3_4 = req.body.MC_10_2_4;
      
// const
//         EC_10_4_3 = req.body.EC_10_4_3;
//         const
//         MC_10_4_4 = req.body.MC_10_4_4;
       
// const
//         EC_10_5_3 = req.body.EC_10_5_3;
//         const
//         MC_10_5_4 = req.body.MC_10_5_4;
       
// const
//         EC_10_6_3 = req.body.EC_10_6_3;
//         const
//         MC_10_6_4 = req.body.MC_10_6_4;
       
// const
//         EC_10_7_3 = req.body.EC_10_7_3;
//         const
//         MC_10_7_4 = req.body.MC_10_7_4;
       
// const
//         EC_10_8_3 = req.body.EC_10_8_3;
//         const
//         MC_10_8_4 = req.body.MC_10_8_4;
       
// const
//         ER_9_1_3 = req.body.ER_9_1_3;
//         const
//         EC_9_1_4 = req.body.EC_9_1_3;
//         const
//         MR_9_1_5 = req.body.MR_9_1_5;
//         const
//         MC_9_1_6 = req.body.MC_9_1_6;
       
// const
//         ER_9_2_3 = req.body.ER_9_2_3;
//         const
//         EC_9_2_4 = req.body.EC_9_2_4;
//         const
//         MC_9_2_6 = req.body.MC_9_2_6;
//         const
//         MR_9_2_5 = req.body.MR_9_2_5;
       
// const
//         ER_9_3_3 = req.body.ER_9_3_3;
//         const
//         EC_9_3_4 = req.body.EC_9_3_4;
//         const
//         MC_9_3_6 = req.body.MC_9_3_6;
//         const
//         MR_9_3_5 = req.body.MR_9_3_5;
       
// const
//         ER_9_4_3 = req.body.ER_9_4_3;
//         const
//         EC_9_4_4 = req.body.EC_9_4_4;
//         const
//         MC_9_4_6 = req.body.MC_9_4_6;
//         const
//         MR_9_4_5 = req.body.MR_9_4_5;
       
// const
//    TER = req.body.TER;
//    const
//    TMR = req.body.TMR;
//    const
//    Taverage = req.body.Taverage;
//    const
//    TavgMR = req.body.TavgMR;
   
// const
//    EC_over = req.body.EC_over;
//    const
//    MC_over = req.body.MC_over;
//    const
//         total_average_ER1 = req.body.total_average_ER1;
//         const
//         total_average_MR1 = req.body.total_average_MR1;
 
// const
//         total_average_ER2 = req.body.total_average_ER2;
//         const
//         total_average_MR2 = req.body.total_average_MR2;
// //         const oldUser =  EmployeeDetails1.findOne({offId:email });
// //    console.log("==============line 3163"+ oldUser.offEmail)
//    const oldUser3 =await  EmployeeDetails1.findOne({offId:EmpId });
//         const oldUser4 =await  EmployeeDetails1.findOne({offId:reviewappariser });
//         const oldUser5 =await  EmployeeDetails1.findOne({offId:HrName });
//         const em=oldUser3.offEmail;
//         const em2=oldUser4.offEmail;
//         const em3=oldUser5.offEmail;
        
//         await AppraisalInfo.findOne({ aprId:aprId }, (err, AppraisalInfo) => {
//             AppraisalInfo.EmployeeName =  EmployeeName,
//             AppraisalInfo.ManagerName =  ManagerName,
//             AppraisalInfo.Designation =  Designation,
//             AppraisalInfo.EmpId =  EmpId,
//             AppraisalInfo.doj =  doj,
//             AppraisalInfo.status =  status,
//             AppraisalInfo.submission_date =  submission_date,
//       AppraisalInfo.department =  department,
//             AppraisalInfo.TotalExperience =  TotalExperience,
//             AppraisalInfo.experience =  experience,
//             AppraisalInfo.cycle =  cycle,
//             AppraisalInfo.reviewappariser =  reviewappariser,
//             AppraisalInfo.HrName =  HrName,
//             AppraisalInfo.Lastupdate =  Lastupdate,
            
//             // ----------------------Domain and Teachnology----------------------------ab.-
//             AppraisalInfo.
//             Dom_Tech_ER_1 =  Dom_Tech_ER_1,
//             AppraisalInfo.
//             Dom_Tech_EC_1 =  Dom_Tech_EC_1,
//             AppraisalInfo.
//             Dom_Tech_MR_1 =  Dom_Tech_MR_1,
//             AppraisalInfo.
//             Dom_Tech_MC_1 =  Dom_Tech_MC_1,
 
//             //---------------------- Understanding function and Technology-----------------------------------ab. 
//             AppraisalInfo.
//             Un_fun_ER_1 =  Un_fun_ER_1,
//             AppraisalInfo.
//             Un_fun_EC_1 =  Un_fun_EC_1,
//             AppraisalInfo.
//             Un_fun_MR_1 =  Un_fun_MR_1,
//             AppraisalInfo.
//             Un_fun_MC_1 =  Un_fun_MC_1,
//             //------------------------------Usage of tools----------------------ab.-
//             AppraisalInfo.
//             Usage_Tools_ER_1 =  Usage_Tools_ER_1,
//             AppraisalInfo.
//             Usage_Tools_EC_1 =  Usage_Tools_EC_1,
//             AppraisalInfo.
//             Usage_Tools_MR_1 =  Usage_Tools_MR_1,
//             AppraisalInfo.
//             Usage_Tools_MC_1 =  Usage_Tools_MC_1,
//             // -------------------------Ability to learn Technology---------------------ab.-
//             AppraisalInfo.
//             Ability_learn_ER_1 =  Ability_learn_ER_1,
//             AppraisalInfo.
//             Ability_learn_EC_1 =  Ability_learn_EC_1,
//             AppraisalInfo.
//             Ability_learn_MR_1 =  Ability_learn_MR_1,
//             AppraisalInfo.
//             Ability_learn_MC_1 =  Ability_learn_MC_1,
      
//             AppraisalInfo.
//             procedure_eqality_ER_2 =  procedure_eqality_ER_2,
//             AppraisalInfo.
//             procedure_eqality_EC_2 =  procedure_eqality_EC_2,
//             AppraisalInfo.
//             procedure_eqality_MC_2 =  procedure_eqality_MC_2,
//             AppraisalInfo.
//             procedure_eqality_MR_2 =  procedure_eqality_MR_2,
//             AppraisalInfo.
//             problem_finding_skill_ER_2 =  problem_finding_skill_ER_2,
//             AppraisalInfo.
//             problem_finding_skill_EC_2 =  problem_finding_skill_EC_2,
//             AppraisalInfo.
//             problem_finding_skill_MR_2 =  problem_finding_skill_MR_2,
//             AppraisalInfo.
//             problem_finding_skill_MC_2 =  problem_finding_skill_MC_2,
      
//             AppraisalInfo.
//             contribute_mentor_help_ER_3 =  contribute_mentor_help_ER_3,
//             AppraisalInfo.
//             contribute_mentor_help_EC_3 =  contribute_mentor_help_EC_3,
//             AppraisalInfo.
//             contribute_mentor_help_MC_3 =  contribute_mentor_help_MC_3,
//             AppraisalInfo.
//             contribute_mentor_help_MR_3 =  contribute_mentor_help_MR_3,
//             AppraisalInfo.
//             professional_relationship_ER_3 =  professional_relationship_ER_3,
//             AppraisalInfo.
//             professional_relationship_EC_3 =  professional_relationship_EC_3,
//             AppraisalInfo.
//             professional_relationship_MR_3 =  professional_relationship_MR_3,
//             AppraisalInfo.
//             professional_relationship_MC_3 =  professional_relationship_MC_3,
//             AppraisalInfo.
//             challenges_responsibility_ER_4 =  challenges_responsibility_ER_4,
//             AppraisalInfo.
//             challenges_responsibility_EC_4 =  challenges_responsibility_EC_4,
//             AppraisalInfo.
//             challenges_responsibility_MR_4 =  challenges_responsibility_MR_4,
//             AppraisalInfo.
//             challenges_responsibility_MC_4 =  challenges_responsibility_MC_4,
//             AppraisalInfo.
//             Ideas_knowledge_ER_4 =  Ideas_knowledge_ER_4,
//             AppraisalInfo.
//             Ideas_knowledge_EC_4 =  Ideas_knowledge_EC_4,
//             AppraisalInfo.
//             Ideas_knowledge_MR_4 =  Ideas_knowledge_MR_4,
//             AppraisalInfo.
//             Ideas_knowledge_MC_4 =  Ideas_knowledge_MC_4,
//             AppraisalInfo.
//             Listen_understand_info_ER_5 =  Listen_understand_info_ER_5,
//             AppraisalInfo.
//             Listen_understand_info_EC_5 =  Listen_understand_info_EC_5,
//             AppraisalInfo.
//             Listen_understand_info_MR_5 =  Listen_understand_info_MR_5,
//             AppraisalInfo.
//             Listen_understand_info_MC_5 =  Listen_understand_info_MC_5,
//             AppraisalInfo.
//             info_clear_EC_5 =  info_clear_EC_5,
//             AppraisalInfo.
//             info_clear_ER_5 =  info_clear_ER_5,
//             AppraisalInfo.
//             info_clear_MC_5 =  info_clear_MC_5,
//             AppraisalInfo.
//             info_clear_MR_5 =  info_clear_MR_5,
//             AppraisalInfo.
//             Plan_Schedules_ER_6 =  Plan_Schedules_ER_6,
//             AppraisalInfo.
//             Plan_Schedules_EC_6 =  Plan_Schedules_EC_6,
//             AppraisalInfo.
//             Plan_Schedules_MR_6 =  Plan_Schedules_MR_6,
//             AppraisalInfo.
//             Plan_Schedules_MC_6 =  Plan_Schedules_MC_6,
//             AppraisalInfo.
//             Effective_work_EC_6 =  Effective_work_EC_6,
//             AppraisalInfo.
//             Effective_work_ER_6 =  Effective_work_ER_6,
//             AppraisalInfo.
//             Effective_work_MR_6 =  Effective_work_MR_6,
//             AppraisalInfo.
//             Effective_work_MC_6 =  Effective_work_MC_6,
//             AppraisalInfo.
//             Management_ER_6 =  Management_ER_6,
//             AppraisalInfo.
//             Management_EC_6 =  Management_EC_6,
//             AppraisalInfo.
//             Management_MC_6 =  Management_MC_6,
//             AppraisalInfo.
//             Management_MR_6 =  Management_MR_6,
//             AppraisalInfo.
//             accomplishment_ER_6 =  accomplishment_ER_6,
//             AppraisalInfo.
//             accomplishment_MR_6 =  accomplishment_MR_6,
//             AppraisalInfo.
//             accomplishment_EC_6 =  accomplishment_EC_6,
//             AppraisalInfo.
//             accomplishment_MC_6 =  accomplishment_MC_6,
//             AppraisalInfo.
//             customer_relationship_EC_7 =  customer_relationship_EC_7,
//             AppraisalInfo.
//             customer_relationship_ER_7 =  customer_relationship_ER_7,
//             AppraisalInfo.
//             customer_relationship_MC_7 =  customer_relationship_MC_7,
//             AppraisalInfo.
//             customer_relationship_MR_7 =  customer_relationship_MR_7,
//             AppraisalInfo.
//             Depend_reliability_ER_7 =  Depend_reliability_ER_7,
//             AppraisalInfo.
//             Depend_reliability_EC_7 =  Depend_reliability_EC_7,
//             AppraisalInfo.
//             Depend_reliability_MR_7 =  Depend_reliability_MR_7,
//             AppraisalInfo.
//             Depend_reliability_MC_7 =  Depend_reliability_MC_7,
//             AppraisalInfo.
//             policies_EC_7 =  policies_EC_7,
//             AppraisalInfo.
//             policies_ER_7 =  policies_ER_7,
//             AppraisalInfo.
//             policies_MR_7 =  policies_MR_7,
//             AppraisalInfo.
//             policies_MC_7 =  policies_MC_7,
//             AppraisalInfo.
//             Resilience_ER_7 =  Resilience_ER_7,
//             AppraisalInfo.
//             Resilience_EC_7 =  Resilience_EC_7,
//             AppraisalInfo.
//             Resilience_MC_7 =  Resilience_MC_7,
//             AppraisalInfo.
//             Resilience_MR_7 =  Resilience_MR_7,
//             AppraisalInfo.
//             semiannual_EC_8 =  semiannual_EC_8,
//             AppraisalInfo.
//             semiannual_ER_8 =  semiannual_ER_8,
//             AppraisalInfo.
//             semiannual_MC_8 =  semiannual_MC_8,
//             AppraisalInfo.
//             semiannual_MR_8 =  semiannual_MR_8,
//             AppraisalInfo.
//             semiannual2_EC_8 =  semiannual2_EC_8,
//             AppraisalInfo.
//             semiannual2_ER_8 =  semiannual2_ER_8,
//             AppraisalInfo.
//             semiannual2_MC_8 =  semiannual2_MC_8,
//             AppraisalInfo.
//             semiannual2_MR_8 =  semiannual2_MR_8,
//             AppraisalInfo.
//             EC_10_1_3 =  EC_10_1_3,
//             AppraisalInfo.
//             MC_10_1_4 =  MC_10_1_4,
//             AppraisalInfo.
//             EC_10_2_3 =  EC_10_2_3,
//             AppraisalInfo.
//             MC_10_2_4 =  MC_10_2_4,
//             AppraisalInfo.
//             EC_10_3_3 =  EC_10_3_3,
//             AppraisalInfo.
//             MC_10_3_4 =  MC_10_2_4,
//             AppraisalInfo.
//             EC_10_4_3 =  EC_10_4_3,
//             AppraisalInfo.
//             MC_10_4_4 =  MC_10_4_4,
//             AppraisalInfo.
//             EC_10_5_3 =  EC_10_5_3,
//             AppraisalInfo.
//             MC_10_5_4 =  MC_10_5_4,
//             AppraisalInfo.
//             EC_10_6_3 =  EC_10_6_3,
//             AppraisalInfo.
//             MC_10_6_4 =  MC_10_6_4,
//             AppraisalInfo.
//             EC_10_7_3 =  EC_10_7_3,
//             AppraisalInfo.
//             MC_10_7_4 =  MC_10_7_4,
//             AppraisalInfo.
//             EC_10_8_3 =  EC_10_8_3,
//             AppraisalInfo.
//             MC_10_8_4 =  MC_10_8_4,
//             AppraisalInfo.
//             ER_9_1_3 =  ER_9_1_3,
//             AppraisalInfo.
//             EC_9_1_4 =  EC_9_1_4,
//             AppraisalInfo.
//             MR_9_1_5 =  MR_9_1_5,
//             AppraisalInfo.
//             MC_9_1_6 =  MC_9_1_6,
//             AppraisalInfo.
//             ER_9_2_3 =  ER_9_2_3,
//             AppraisalInfo.
//             EC_9_2_4 =  EC_9_2_4,
//             AppraisalInfo.
//             MC_9_2_6 =  MC_9_2_6,
//             AppraisalInfo.
//             MR_9_2_5 =  MR_9_2_5,
//             AppraisalInfo.
//             ER_9_3_3 =  ER_9_3_3,
//             AppraisalInfo.
//             EC_9_3_4 =  EC_9_3_4,
//             AppraisalInfo.
//             MC_9_3_6 =  MC_9_3_6,
//             AppraisalInfo.
//             MR_9_3_5 =  MR_9_3_5,
//             AppraisalInfo.
//             ER_9_4_3 =  ER_9_4_3,
//             AppraisalInfo.
//             EC_9_4_4 =  EC_9_4_4,
//             AppraisalInfo.
//             MC_9_4_6 =  MC_9_4_6,
//             AppraisalInfo.
//             MR_9_4_5 =  MR_9_4_5,
//             AppraisalInfo.
//        TER =  TER,
//        AppraisalInfo.
//        TMR =  TMR,
//        AppraisalInfo.
//        Taverage =  Taverage,
//        AppraisalInfo.
//        TavgMR =  TavgMR,
//        AppraisalInfo.
//        EC_over =  EC_over,
//        AppraisalInfo.
//        MC_over =  MC_over,
//        AppraisalInfo.
//             total_average_ER1 =  total_average_ER1,
//             AppraisalInfo.
//             total_average_MR1 =  total_average_MR1,
//             AppraisalInfo.
//             total_average_ER2 =  total_average_ER2,
//             AppraisalInfo.
//             total_average_MR2 =  total_average_MR2,
//             AppraisalInfo.save();
//             sendEmail3( em,"Appraisal  of "+EmpId,em2,em3,"Appraisal Information Updated, Please Chaeck on system");

//             // sendEmail3(EmpId, "Appraisal Form Submitted","Appraisal Form Submitted","");
//             // sendEmail3(reviewappariser, "Appraisal Form Submitted","Appraisal Form Submitted","")
//             // sendEmail3(reviewappariser, "Appraisal Form Submitted","Appraisal Form Submitted","")
           
//             // res.send("Role updated");
//             res.send({ message: " Data updated successfully", val: false, val2: true })

//         });
//     }
//     catch (err) {
//         console.log(err);
//     }
// })


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
        
const eDataS={eid:eid,ename:ename,
    reportingPerson:reportingPerson,l_reason:l_reason,l_reason2:l_reason2,
    start_date:start_date,end_date:end_date
    ,l_type:l_type,l_category:l_category,approvedBy:approvedBy,l_status:l_status
    }
        const diff=(day2.getTime()-day1.getTime())/(24*60*60*1000);
const days=Math.abs(Math.round(diff))+1;
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
sendEmail2(employeeDetailsLogin.emp_email, "Leave have replied",eDataS,"");
sendEmail2(reportingPerson, "Leave have replied",eDataS,"")
            // res.send("leave  info updated");
            res.send({ message: " Data updated successfully", val: false, val2: true })

        });        });
    }
    catch (err) {
        console.log(err);
    }
})

// app.put("/updateLeaveInfo2", async (req, res) => {
//     try {
//         // const  id = req.body.id;
//         const eid=req.body.eid;
//         const l_id=req.body. l_id;
//         const ename=req.body.ename;
//         const reportingPerson=req.body.reportingPerson;
//         const l_reason=req.body.l_reason;
//         const l_reason2=req.body.l_reason2

//         const start_date=req.body.start_date;
//         const end_date=req.body.end_date;
//         const l_status=req.body.l_status;
//         const l_type=req.body.l_type;
//         const l_category=req.body.l_category;
//         const approvedBy=req.body.approvedBy;
//         const sys_user=req.body.sys_user;
//         const day1=new Date(start_date);
//         const day2=new Date(end_date);
        
// const eDataS={eid:eid,ename:ename,
//     reportingPerson:reportingPerson,l_reason:l_reason,l_reason2:l_reason2,
//     start_date:start_date,end_date:end_date
//     ,l_type:l_type,l_category:l_category,approvedBy:approvedBy,l_status:l_status
//     }
//         const diff=(day2.getTime()-day1.getTime())/(24*60*60*1000);
// const days=Math.abs(Math.round(diff));
// // const m=2; EmployeeDetailsLogin
// await EmployeeDetailsLogin.findOne({emp_id:eid},(err,employeeDetailsLogin)=>{





// console.log(employeeDetailsLogin.emp_email+"-------------------------------------------------line 1863");

//         // await 
//         LeaveManage.findOne({ l_id: l_id }, (err, leaveManage) => {

//         leaveManage.eid=eid;
//         leaveManage.l_id=l_id;
//         leaveManage.ename=ename;
//         leaveManage.reportingPerson=reportingPerson;
//         leaveManage.l_reason=l_reason;
//         leaveManage.l_reason2=l_reason2

//         leaveManage.start_date=start_date;
//         leaveManage.end_date=end_date;
//         leaveManage.l_status=l_status;
//         leaveManage.l_type=l_type;
//         leaveManage.l_category=l_category;
//    leaveManage.approvedBy=approvedBy;
//    leaveManage.createdBy=sys_user;
//    leaveManage.updatedBy=sys_user;
//    leaveManage.cr_time=new Date();
//    leaveManage.up_date=new Date();
//         leaveManage.save();
             
// // await
// if(l_status=="approved")
// { LeaveInfo.findOne({ eid: eid }, (err, leaveInfo) => {
//     const l1=leaveInfo.leave_in_buck;
//     const l2=leaveInfo.availed_leave;
//     leaveInfo.eid=eid;
//     // leaveInfo.total_leave;
//     if(l1<days){
//         const a=days-l1;
//     leaveInfo.leave_in_buck=0;
//     leaveInfo.lop=a+leaveInfo.lop;
//     }
//     else{

//         leaveInfo.leave_in_buck=l1-days;
//         leaveInfo.lop=leaveInfo.lop;
//     }
//     leaveInfo.availed_leave=l2+days;
//     const d =new Date();
//     cr_date=d.getMonth();
//     leaveInfo.save();
//     // res.send("leave updated");

// });}
// sendEmail2(employeeDetailsLogin.emp_email, "Leave have updated",eDataS,"");
// sendEmail2(reportingPerson, "Leave have updated",eDataS,"")
//             res.send("leave  info updated");

//         });        });
//     }
//     catch (err) {
//         console.log(err);
//     }
// })
/* DELETE BOOK */
// app.post(`/delete/:id`, async (req, res) => {
//     const l_id = req.params.id;
//     // await EmployeeDetails1.findOne({emp_id:req.body.eid},(err,employeeDetailsLogin)=>{
//     // });
//     // await
    
//     //  await 
//     // LeaveManage.find({l_id:l_id}).remove();
//     const eid=req.body.eid;
//     const mess=req.body.message;
//     const oldUser = await EmployeeDetailsLogin.findOne({ emp_id:eid });
//     await LeaveManage.find({emp_id:eid}).then(function(leaveManage) {
//         const ar3=leaveManage;
//     ar3.map((data)=>{


//         tempar={eid:data.eid,ename:data.ename,
//             reportingPerson:data.reportingPerson,l_reason:data.l_reason,l_reason2:data.l_reason2,
//             start_date:data.start_date,end_date:data.end_date
//             ,l_type:data.l_type,l_category:data.l_category,approvedBy:data.approvedBy,l_status:data.l_status}





//     })})
//     await LeaveManage.deleteOne({l_id:l_id});
//     // console.log("------------------->line 1796"+req.body.message);
//     sendEmail2(oldUser.emp_email, "Leave have canceled",tempar,mess);
// sendEmail2(req.body.reportingPerson, "Leave have canceled",tempar,mess)

//     res.send("deleted");

// });

/////////cancel apraisal 
// app.post(`/cancelAppraisal/:id`, async (req, res) => {
//     const l_id = req.params.id;
//     const eid=req.body.eid;
//     const mess=req.body.message;
//     const oldUser = await EmployeeDetailsLogin.findOne({ emp_id:eid });
//     const oldUser2 = await EmployeeDetailsLogin.findOne({ emp_id:l_id });
    
//     await AppraisalInfo.deleteOne({EmpId:eid});
//     // console.log("------------------->line 1796"+req.body.message);
//     sendEmail2(oldUser.emp_email, "Appraisal have canceled","",mess);
// sendEmail2(oldUser2.emp_email, "Appraisal have canceled","",mess)

//     res.send("deleted");

// });


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
}, 1000*60*60*24);
// bachProcess2();
app.listen(port, () => {
    console.log("BE started at port 9005")
})

