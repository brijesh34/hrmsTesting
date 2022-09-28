const mongoose = require("mongoose");

const userSchema11 = new mongoose.Schema({
    eid: String,
   total_leave:Number,
   leave_in_buck:Number,
   availed_leave:Number,
   lop:Number,
//    createdBy:String,
//    updatedBy:String,
//    cr_time:Date,
   cr_date:Number
})
const LeaveInfo = new mongoose.model("LeaveInfo", userSchema11);

module.exports = LeaveInfo;
