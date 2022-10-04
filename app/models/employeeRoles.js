const mongoose = require("mongoose");

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


const EmployeeRoles = new mongoose.model("EmpRoles", userSchema4);
module.exports = EmployeeRoles;
