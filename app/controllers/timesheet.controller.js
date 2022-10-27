const db = require("../models");
// const config = require("../config/auth.config");
// const Role = db.role;
// const EmployeeDetails1 = db.EmployeeDetails1;
// const LeaveInfo=db.LeaveInfo;
// const EmployeeDetailsLogin=db.EmployeeDetailsLogin;
const EmpTimesheet=db.EmpTimesheet;

// const EmployeeDetails1 = db.EmployeeDetails1;

// const sendHtmlEmail = require("./passwordEmail.controller");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.gettimeSheet = async (req, res) => {
    try {
        const tempar=[];
        const tempar2=[{
            end:'', start:'', Duration:'', description:'',id:'',title:'',idt:''
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
tempar.push({end:data.end,start:start_d,Duration:data.tid,description:data.description,id:data.id,title:data.title,idt:data.tid,tid:"data.tid"})
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
    
    } catch (err) {
        console.error(err)
    }

};


exports.addtimeSheet = async (req, res) => {
    try { const { emp_id,
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
        tid:new Date(),
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
            res.send({ message: "successfully registered title", val2: true })
        }
    })
    
    } catch (err) {
        console.error(err)
    }

};

exports.updatetimeSheet = async (req, res) => {
    try {
        const emp_id=req.body.emp_id;
        const start=req.body.start;
        const end=req.body.end;
const tid=req.body.tid;
        const id=req.body.id;
        const title=req.body.title;
        const description=req.body.description;
        const Duration=req.body.Duration;
const sys_user=req.body.sys_user;
        await EmpTimesheet.findOne({tid:tid }, (err, empTimesheet) => {

            empTimesheet.emp_id=emp_id,
            empTimesheet.start=start,
            empTimesheet.end=end,
    
            empTimesheet.id=id,
            empTimesheet.title=title,
            empTimesheet.description=description,
            empTimesheet.Duration=Duration,
            empTimesheet.createdBy=sys_user,
            empTimesheet.updatedBy=sys_user,
            empTimesheet.cr_time=new Date(),
            empTimesheet.up_date=new Date(),
            empTimesheet.save();
            // res.send("timesheet info updated");
            res.send({ message: " Data updated successfully", val: false , val2: true})

        });  }
    catch (err) {
        console.log(err);
    }
};