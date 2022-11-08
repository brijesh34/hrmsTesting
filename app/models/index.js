const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.AppraisalInfo = require("./appraisalInfo");
db.EmployeeDetails1 = require("./employeeInfo");
db.EmployeeDetailsLogin = require("./employeeLogin");
db.EmployeeRoles = require("./EmployeeRoles");
db.EmpTimesheet = require("./EmployeeTimesheet");
db.LeaveCategory = require("./LeaveCategory");
db.LeaveInfo = require("./LeaveInfo");
db.LeaveManage = require("./LeaveManage");
db.LeaveTypes = require("./LeaveTypes");
db.ProjectInfo = require("./ProjectInfo");
db.PolicyInfo = require("./PolicyInfo");


module.exports = db;
