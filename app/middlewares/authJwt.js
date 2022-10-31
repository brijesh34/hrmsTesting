const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
// const db = require("../models");
// const User = db.employee;
// const Role = db.role;
// const Employee = db.employee;

verifyToken = () => (req, res, next) => {

  try {
    let token = req.headers["authorization"];
    console.log("12......................................",token)
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    //get User Roles from here
    // jwt.verify(token, config.secret, (err, decoded) => {
    //   if (err) {
    //     return res.status(401).send({ message: "Unauthorized! " + err.message + " " + token });
    //   }
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
  
