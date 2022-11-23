const db = require("../models");
const upload=require("../middlewares/fileUpload");
const Policy=db.PolicyInfo
const EmployeeDetailsLogin = db.EmployeeDetailsLogin;

exports.addPolicy=async(req,res)=>{
    try {
        console.log(req.file + "single file uploadede successfully.........................>>>>>>>>>>>>>>>>");
        let profile = (req.file) ? req.file.filename : null;
          console.log(profile);
        //   const { policy_id,policy_name,policy_img } = req.body
        //   upload.upload();
        
        // const { policy_id,policy_name } = req.body
          const { policy_name } = req.body
          const policy_no = await Policy.find({});
        const len = policy_no.length + 1;
        const policy_id="inv_pol_0"+len;
          const policy = await Policy.create({
            policy_id,policy_name,policy_img:profile});
            res.send({ message2: "successfully registered policy", val2: "true",val: "false" })

        // res.send("single file uploadede successfully.........................>>>>>>>>>>>>>>>>");
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
            if(profile==null){
        profile=policy.policy_img
            }
            
            policy.policy_name=policy_name,
            policy.policy_img=profile,
            policy.save();
            // res.send("single file uploadede successfully.........................>>>>>>>>>>>>>>>>");
            res.send({ message2: "policy successfully updated", val2: "true",val: "false" })

          }
          )

        // const policy = await Policy.create({
        //   policy_id,policy_name,policy_img:profile});
    
      // res.send("single file uploadede successfully.........................>>>>>>>>>>>>>>>>");
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

exports.viewPolicy = async (req, res) => {
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


exports.setStatus=async(req,res)=>{
try {
    const {policy_status,token} = req.body;
// const token =req.body.token
    // const id = req.body.id;
    console.log(token + policy_status+"===================line96")

    await EmployeeDetailsLogin.findOne({ emp_token: token }, (err, employeeDetailsLogin) => {
        employeeDetailsLogin.emp_policy_status = policy_status;

        employeeDetailsLogin.save();
        // res.send("Password updated");
        res.send({ message: " Data updated successfully", val: false, val2: true })
    });
}
  catch(err){
      console.log(err);
  }
};
