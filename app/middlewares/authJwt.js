const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { EmployeeDetailsLogin } = require("../models");

verifyToken = async (req, res, next) => {

  try {
    
    let token = req.headers["authorization"];
    console.log("12......................................", token)
    if (!token) {
      return res.status(403).send({ message: "Bad Request!" });
    }
    else {
      
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      // const emp = await EmployeeDetailsLogin.findOne({ emp_token: token });
      const verf=jwt.verify(token,jwtSecretKey,(err,user)=>{if(err)
      {

        
        console.log("-------------------")
        console.log(err)
        return res.status(403).send({ message: "Bad Request!" });
    
      }
      else{
        next();

      }
    });
      // if (emp) {
      //   console.log("succccccccccccccccccccccccccc");
      //   next();

      // }

    }

  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

const authJwt = {
  verifyToken

};
module.exports = authJwt;

