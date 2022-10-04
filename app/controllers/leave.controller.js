const db = require("../models");
// const config = require("../config/auth.config");
// const Role = db.role;
const EmployeeDetails1 = db.EmployeeDetails1;
const LeaveInfo=db.LeaveInfo;
const EmployeeDetailsLogin=db.EmployeeDetailsLogin;
const LeaveManage=db.LeaveManage;

// const EmployeeDetails1 = db.EmployeeDetails1;

// const sendHtmlEmail = require("./passwordEmail.controller");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getPersonalLeave = async (req, res) => {
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

};

exports.addLeave = async (req, res) => {
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

};
