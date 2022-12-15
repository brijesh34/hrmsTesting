const mongoose = require("mongoose");

const userSchema12 = new mongoose.Schema({
designation_id: String,
    role_name: String,
      designation:String,
      // restriction:'',
      m1:String,
      m2:String,
      m3:String,
      m4:String,
      m5:String,
      m6:String,
      m7:String,
      m8:String,
      m9:String,
      m10:String,
createdBy:String,
   updatedBy:String,
   cr_time:Date,
   up_date:Date
    

})


const Designation = new mongoose.model("Designation", userSchema12);
module.exports = Designation;
