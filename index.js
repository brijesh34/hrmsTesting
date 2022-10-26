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

const mong=({
    type:String,
})
const mess=mongoose.Schema(
    {
        ad:mong,
    }
)

// app.get(`/leavesDetailPending/:id`, async (req, res, next) => {
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
//                         if(data.l_status==="pending"){
//                         var ndate= new Date(data.start_date);
//                         var date=(ndate.getMonth()+1)+'/'+ndate.getDate()+'/'+ndate.getFullYear(); 
//                         var ndate2= new Date(data.end_date);
//                         var date2=(ndate2.getMonth()+1)+'/'+ndate2.getDate()+'/'+ndate2.getFullYear(); 
                       
//             tempar.push({ eid:data.eid,l_id:data.l_id,ename:data.ename,reportingPerson:data.reportingPerson,
//             l_reason:data.l_reason, l_reason2:data.l_reason2,start_date:date,end_date:date2,l_status:data.l_status
//             ,l_type:data.l_type,l_category:data.l_category,s_date:data.start_date,e_date:data.end_date,approvedBy:data.approvedBy}
//             )}})
        
//             res.send({leave:tempar});
         
//         })
//     } catch (err) {
//         console.error(err)
//     }

// })


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
require("./app/routes/Emp.routes")(app);
require("./app/routes/Role.routes")(app);
require("./app/routes/Leave.routes")(app);
require("./app/routes/LeaveInfoSettings.routes")(app);
require("./app/routes/Project.routes")(app);
require("./app/routes/Timesheet.routes")(app);
require("./app/routes/Appraisal.routes")(app);
require("./app/routes/Login.routes")(app);

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
                res.send({ message: " Data updated successfully", val: false, val2: true })
            // });
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

