// const { authJwt } = require("../middlewares");
// const { verifySignUp } = require("../middlewares");
// const verifyEmp = require("../middlewares/verifyEmp");
const controller = require("../controllers/emp.controller");
const { application } = require("express");

module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "authorization, Origin, Content-Type, Accept");
//     next();
//   });
//   app.get("/api/emp/getAllEmp/", [authJwt.verifyToken(["ADMIN", "BM", "FO"])], controller.getAllEmp);

app.get("/api/emp/getAllCurrentEmp", controller.getAllCurrentEmp);
app.get("/api/emp/getAllEmp", controller.getAllEmp);
  
app.get("/api/emp/exemployeeDetail1", controller.getAllExEmp);
app.get(`/api/emp/employeeDetail1/:id`, controller.getPersonal);

app.post("/api/emp/addNew", controller.addNew);
app.put("/api/emp/updateProfile", controller.updateProfile);
  


};