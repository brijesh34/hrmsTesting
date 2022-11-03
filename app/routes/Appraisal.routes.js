// const { authJwt } = require("../middlewares");
// const { verifySignUp } = require("../middlewares");
// const verifyEmp = require("../middlewares/verifyEmp");
const controller = require("../controllers/appraisal.controller");
const { application } = require("express");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "authorization, Origin, Content-Type, Accept");
//     next();
//   });
//   app.get("/api/emp/getAllEmp/", [authJwt.verifyToken(["ADMIN", "BM", "FO"])], controller.getAllEmp);

// app.get("/api/role/getRole", controller.getRole);

// app.post("/api/role/addRole", controller.addRole);
// app.put("/api/role/updateRole", controller.updateRole);
app.get("/api/appraisal/getAppraisalPool",authJwt.verifyToken, controller.getAppraisalPool);
app.post("/api/appraisal/addNewAppraisal",authJwt.verifyToken, controller.addNewAppraisal);
app.put("/api/appraisal/updateAppraisal",authJwt.verifyToken, controller.updateAppraisal);
app.post("/api/appraisal/cancelAppraisal/:id",authJwt.verifyToken, controller.cancelAppraisal);
app.put("/api/appraisal/editByEmployee/",authJwt.verifyToken, controller.editByEmployee);
app.get("/api/appraisal/getSelfAppraisal/:id",authJwt.verifyToken, controller.getSelfAppraisal);
app.get("/api/appraisal/appraisalDetailManager/:id",authJwt.verifyToken, controller.appraisalDetailManager);
app.put("/api/appraisal/editByReportingPerson/",authJwt.verifyToken, controller.editByReportingPerson);
app.get("/api/appraisal/appraisalDetailStatus/:id",authJwt.verifyToken, controller.appraisalDetailStatus);
app.get("/api/appraisal/appraisalDetailStatusPersonal/:id",authJwt.verifyToken, controller.appraisalDetailStatusPersonal);

};