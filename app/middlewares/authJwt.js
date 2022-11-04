const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const { EmployeeDetailsLogin } = require("../models");

verifyToken = async (req, res, next) => {

  try {
    let token = req.headers["authorization"];
    console.log("12......................................", token)
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    else {
      const emp = await EmployeeDetailsLogin.findOne({ emp_token: token });
      if (emp) {
        console.log("succccccccccccccccccccccccccc");
        next();

      }

    }

    console.log("==================================line 21" + config.secret)
  } catch (error) {
    res.status(500).send({ message: error });
    return;
  }
};

const authJwt = {
  verifyToken

};
module.exports = authJwt;

