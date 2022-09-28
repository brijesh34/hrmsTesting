const mongoose = require("mongoose");

//////Category  for employees
const userSchema10 = new mongoose.Schema({
    leaveCategory_id: String,
   leaveCategory_name: String,
   createdBy:String,
   updatedBy:String,
   cr_time:Date,
   up_date:Date
})


const LeaveCategory = new mongoose.model("LeaveCategory", userSchema10);
module.exports = LeaveCategory;
