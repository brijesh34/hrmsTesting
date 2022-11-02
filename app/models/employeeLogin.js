const mongoose = require("mongoose");

const userSchema5 = new mongoose.Schema({
    emp_id: String,
    // emp_role: String,
    emp_password: String,
    emp_email: String,
    emp_status: String,
    emp_token:String,
   createdBy:String,
   updatedBy:String,
   cr_time:Date,
   up_date:Date
})



const EmployeeDetailsLogin = new mongoose.model("EmpLogin", userSchema5);
module.exports = EmployeeDetailsLogin;
