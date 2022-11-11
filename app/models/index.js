const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.AppraisalInfo = require("./appraisalInfo");
db.EmployeeDetails1 = require("./employeeInfo");
db.EmployeeDetailsLogin = require("./employeeLogin");

db.EmployeeRoles = require("./employeeRoles");
db.EmpTimesheet = require("./employeeTimesheet");
db.LeaveCategory = require("./leaveCategory");
db.LeaveInfo = require("./leaveInfo");
db.LeaveManage = require("./leaveManage");
db.LeaveTypes = require("./leaveTypes");
db.ProjectInfo = require("./projectInfo");
db.PolicyInfo = require("./policyInfo");


module.exports = db;
