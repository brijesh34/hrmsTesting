require('dotenv').config();
const db = require("./app/models");
const path=require("path")
const controller = require("./app/controllers/emp.controller");
const ProjectInfo = db.ProjectInfo;
const AppraisalInfo = db.AppraisalInfo;
const EmployeeDetails1 = db.EmployeeDetails1;
const EmployeeDetailsLogin = db.EmployeeDetailsLogin;
const EmployeeRoles = db.EmployeeRoles;
const EmpTimesheet = db.EmpTimesheet;
const LeaveCategory = db.LeaveCategory;
const LeaveInfo = db.LeaveInfo;
const LeaveManage = db.LeaveManage;
const LeaveTypes = db.LeaveTypes;
const Policy=db.PolicyInfo;
var nodemailer = require('nodemailer');
const express = require("express")

const cors = require("cors")
const mongoose = require("mongoose")
const multer = require('multer')
const jwt = require('jsonwebtoken');

const API_PORT = 9001;
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

app.post('/employeefiles', upload.single("highschoolPic"), async (req, res) => {
    let profile = (req.file) ? req.file.filename : null;
    
    res.send("single file uploadede successfully.........................>>>>>>>>>>>>>>>>");
})
app.post("/multiple", upload.array("images", 3),
    (req, res) => {
        console.log(req.files);
        res.send("multiple files upload success");
    });


const DB='mongodb+srv://brijesh34:brijeshmaurya@cluster0.m72fiwl.mongodb.net/HrmsTesting?retryWrites=true&w=majority'
//create database by mongoose
// mongoose.connect("mongodb://0.0.0.0:27017/HRMS_Database", {
//     useNewUrlParser: "true",
// })
mongoose.connect(DB, {
    useNewUrlParser: "true",
    // useCreateIndex:true,
    useUnifiedTopology:true,
    // useFindAndModify:false
}).then(()=>{console.log("mongoose is connected2")
}).catch((err)=>console.log("not connected")
)

mongoose.connection.on("error", err => {
    console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
})


require("./app/routes/Emp.routes")(app);
require("./app/routes/Role.routes")(app);
require("./app/routes/Leave.routes")(app);
require("./app/routes/LeaveInfoSettings.routes")(app);
require("./app/routes/Project.routes")(app);
require("./app/routes/Timesheet.routes")(app);
require("./app/routes/Appraisal.routes")(app);
require("./app/routes/Login.routes")(app);
require("./app/routes/Files.routes")(app);
require("./app/routes/Policy.routes")(app);
require("./app/routes/Events.routes")(app);












////////////update monthly



///////////update yearly
function bachProcess2() {
    //     const d=new Date();
    //     const dm=d.getMonth()-1;
    //     const dm2=d.getMonth();

    LeaveInfo.find({}).then(function (leaveInfo) {


        var ar3 = leaveInfo;
        ar3.map((data) => {
            const d = new Date();
            const dm = d.getMonth();
            const dm2 = d.getMonth() + 1;
            const cr_date = d.getMonth();
            if ((data.cr_date == 12) && (dm2 == 1)) {
                LeaveInfo.findOne({ eid: data.eid }, (err, leaveInfo) => {
                    const l1 = leaveInfo.leave_in_buck;
                    const l2 = leaveInfo.total_leave;
                    leaveInfo.total_leave = l2 + 24;
                    leaveInfo.cr_date = dm2;
                    if (l1 > 12) {

                        leaveInfo.leave_in_buck = 2 + 12;
                    }
                    else {
                        leaveInfo.leave_in_buck = l1 + 2;

                        // leaveInfo.save();
                    }
                    leaveInfo.save();
                });
            }
            else if (data.cr_date === dm) {
                LeaveInfo.findOne({ eid: data.eid }, (err, leaveInfo) => {
                    const l1 = leaveInfo.leave_in_buck;
                    leaveInfo.leave_in_buck = l1 + 2;
                    leaveInfo.cr_date = dm2;
                    leaveInfo.save();
                });

            }
            else {

            }

        })
    })

}


const fileExists = require('file-exists');

fileExists('images/_image.png', (err, exists) => console.log(exists)) // OUTPUTS: true or false

fileExists('images/_image.png').then(exists => {
    console.log(exists) // OUTPUTS: true or false
})


app.get("/", (req, res) => {

    console.log("Try");
    res.send("Welcome!");
})


const as = 1;
const d = new Date();
const dm = d.getMinutes() - 1;
const dd = 5;
const dm2 = d.getMinutes();
setInterval(() => {
    console.log("This is the final function")

    bachProcess2();
}, 1000 * 60 * 60 * 24);
// bachProcess2();
app.use(express.static(path.join(__dirname,"./HRMS_WebPortal/build")));
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,"./HRMS_WebPortal/build/index.html"));
})
app.listen(port, () => {
    console.log("BE started at port 9001")
})

