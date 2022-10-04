const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

// db.user = require("./user.model");

// db.role = require("./role.model");
// db.employee = require("./empSchema");
// db.loan = require("./loanSchema");
// db.branch = require("./branchSchema");
// db.area = require("./areaSchema");
// db.fixedDeposit = require("./fixedDepositSchema");
// db.member = require("./memberSchema");
// db.rd = require("./rdSchema");
// db.ROLES = ["BM", "ADMIN", "FO"];
// const db = require("../models");const ProjectInfo =require("./ProjectInfo");
db.AppraisalInfo=require("./appraisalInfo");
db.EmployeeDetails1=require("./employeeInfo");
db.EmployeeDetailsLogin=require("./employeeLogin");
db.EmployeeRoles=require("./EmployeeRoles");
db.EmpTimesheet=require("./EmployeeTimesheet");
db.LeaveCategory=require("./LeaveCategory");
db.LeaveInfo=require("./LeaveInfo");
db.LeaveManage=require("./LeaveManage");
db.LeaveTypes=require("./LeaveTypes");


module.exports = db;
