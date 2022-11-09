const db = require("../models");
const upload=require("../middlewares/fileUpload");
const Policy=db.PolicyInfo
exports.addPolicy=async(req,res)=>{
    try {
        console.log(req.file + "single file uploadede successfully.........................>>>>>>>>>>>>>>>>");
        let profile = (req.file) ? req.file.filename : null;
          console.log(profile);
        //   const { policy_id,policy_name,policy_img } = req.body
        //   upload.upload();
          const { policy_id,policy_name } = req.body
          
          const policy = await Policy.create({
            policy_id,policy_name,policy_img:profile});
      
        res.send("single file uploadede successfully.........................>>>>>>>>>>>>>>>>");
      }
    catch(err){
        console.log(err);
    }
};
exports.updatePolicy=async(req,res)=>{
  try {
      console.log(req.file + "single file uploadede successfully.........................>>>>>>>>>>>>>>>>");
      let profile = (req.file) ? req.file.filename : null;
        console.log(profile);
      //   const { policy_id,policy_name,policy_img } = req.body
      //   upload.upload();
        const { policy_id,policy_name } = req.body
        await Policy.findOne(
          { policy_id: policy_id },
          (err, policy) => {
            policy.policy_name=policy_name,
            policy.policy_img=profile,
            policy.save();
            
          })

        // const policy = await Policy.create({
        //   policy_id,policy_name,policy_img:profile});
    
      res.send("single file uploadede successfully.........................>>>>>>>>>>>>>>>>");
    }
  catch(err){
      console.log(err);
  }
};
exports.getPolicy = async (req, res) => {
  try {
    Policy.find({}, (err, Policy) => {
          if (err) {
              console.warn(err)
              return next(err)
          }
          console.warn(Policy);
          //res.json(employeedetails);
          res.send(Policy);
      })
  } catch (err) {
      console.error(err)
  }

};
