const mongoose = require("mongoose");

const userSchema9 = new mongoose.Schema({
    leaveType_id: String,
    leaveType_name: String,
    createdBy:String,
    updatedBy:String,
    cr_time:Date,
    up_date:Date
    // role_display_name: String,
    // displayName:String

})


const LeaveTypes = new mongoose.model("LeaveTypes", userSchema9);
module.exports = LeaveTypes;
