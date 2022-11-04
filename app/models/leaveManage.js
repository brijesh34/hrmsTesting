const mongoose = require("mongoose");

const userSchema8 = new mongoose.Schema({


    eid: String,
    l_id: String,
    ename: String,
    reportingPerson: String,
    l_reason: String,
    l_reason2: String,

    start_date: Date,
    end_date: Date,
    l_status: String,
    l_type: String,
    l_category: String,
    approvedBy: String,
    createdBy: String,
    updatedBy: String,
    cr_time: Date,
    up_date: Date
})


const LeaveManage = new mongoose.model("LeaveManage", userSchema8);
module.exports = LeaveManage;
