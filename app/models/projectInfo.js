const mongoose = require("mongoose");

const userSchema7 = new mongoose.Schema({
    pid: String,
    pname: String,
    pstatus: String,
    phead: String,
    pdescription: String,
    createdBy: String,
    updatedBy: String,
    cr_time: Date,
    up_date: Date
})

const ProjectInfo = new mongoose.model("ProjectInfo", userSchema7);

module.exports = ProjectInfo;
