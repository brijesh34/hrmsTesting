const authJwt = require("../middlewares/authJwt");
const controller = require("../controllers/emp.controller");
const { application } = require("express");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "authorization, Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/emp/getAllCurrentEmp", authJwt.verifyToken, controller.getAllCurrentEmp);
  app.get("/api/emp/getAllEmp", authJwt.verifyToken, controller.getAllEmp);

  app.get("/api/emp/exemployeeDetail1", authJwt.verifyToken, controller.getAllExEmp);
  app.get(`/api/emp/employeeDetail1/:id`, authJwt.verifyToken, controller.getPersonal);
  app.get("/api/emp/reportingManStatus/:id", authJwt.verifyToken, controller.reportingManStatus);
    
  app.post("/api/emp/addNew", authJwt.verifyToken, controller.addNew);
  app.put("/api/emp/updateProfile", authJwt.verifyToken, controller.updateProfile);

};
//reportingManStatus