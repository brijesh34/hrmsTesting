const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { EmployeeDetailsLogin } = require("../models");
// const db = require("../models");
// const User = db.employee;
// const Role = db.role;
// const Employee = db.employee;

verifyToken =  async(req, res, next) => {

  try {
    let token = req.headers["authorization"];
    console.log("12......................................",token)
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    else{
      const emp =await  EmployeeDetailsLogin.findOne({emp_token:token });
      if(emp){
        console.log("succccccccccccccccccccccccccc");
        next();

      }
   
    }
    //get User Roles from here
    // jwt.verify(token, config.secret, (err, decoded) => {
    //   if (err) {
    //     return res.status(401).send({ message: "Unauthorized! " + err.message + " " + token });
    //   }
    
    console.log("==================================line 21"+config.secret)
    // const verified = jwt.verify(token, config.secret, (err, decoded) => { console.log("line 22;;;;"+err) });
    //     if(verified){
    //         console.log("Successfully Verified===================line23");
    //     }else{
    //         // Access Denied
    //         console.log("not Verified====================line26");
    //         // return res.status(401).send(error);
    //     }
    
    
    // next();
    // return;
      //  })  
        //   req.userId = decoded.id;
    //   User.findById(req.userId).exec((err, user) => {
    //     if (err || user === null) {
    //       let mess = err;
    //       if (user === null) {
    //         mess = "Please login again.";
    //       }
    //       res.status(500).send({ message: mess });
    //       return;
    //     }
        // Role.find(
        //   {
        //     _id: { $in: user.roles },
        //   },
        //   (err, roles) => {
        //     if (err) {
        //       res.status(500).send({ message: err });
        //       return;
        //     }

        //     for (let i = 0; i < roles.length; i++) {
        //       if (allowedRoles.includes(roles[i].name)) {
        //         next();
        //         return;
        //       }
        //     }

            // res.status(403).send({ message: "Require either of " + allowedRoles.map((role) => role) + " Roles!" });
            // return;
        //   }
        // );
    //   });
    // });
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

const authJwt = {
    verifyToken
    
  };
  module.exports = authJwt;
  
