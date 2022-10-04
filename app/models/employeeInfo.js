const mongoose = require("mongoose");
const userSchema2 = new mongoose.Schema({
    name: String,
    fname: String,
    email: String,
    gender: String,
    offEmail: String,
    offId: String,
    address: String,
    aadhaar: String,
    pan: String,
    bankAccount: String,
    bankName: String,
    bankIfsc: String,
    Country: String,
    state: String,
    city: String,
    pincode: String,
    highestDegree: String,
    lastCollegeCompany: String,
    phoneNo: String,
    jobType: String,
    dob: Date,
    // salary: Number,

    noExp: Number,
    status: String,

    DoJ: Date,
    ReportingManager: String,
    createdBy:String,
    updatedBy:String,
    cr_time:Date,
    up_date:Date
})


const EmployeeDetails1 = new mongoose.model("EmpInfo", userSchema2);

module.exports = EmployeeDetails1;
