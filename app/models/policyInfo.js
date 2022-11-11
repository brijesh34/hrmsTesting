const mongoose=require("mongoose");

//schema
const policy = new mongoose.Schema({
    policy_id:String,
    policy_name: String,
    created_by: String,
    updated_by: String,
    //   image:String
  
    policy_img: String,
    cr_time:Date,
    up_time:Date
    // profile2:String
  })
  ///model
  const PolicyInfo = new mongoose.model("PolicyInfo", policy);
  module.exports= PolicyInfo;
  