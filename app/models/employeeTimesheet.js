const mongoose = require("mongoose");

const userSchema6 = new mongoose.Schema({
    tid:String,
    emp_id: String,
    start: Date,
    end: Date,

    id: String,
    title: String,
    description: String,
    // ab:[mess],

     Duration:Number,
     createdBy:String,
    updatedBy:String,
    cr_time:Date,
    up_date:Date
})


const EmpTimesheet = new mongoose.model("EmpTimesheet", userSchema6);
module.exports = EmpTimesheet;
