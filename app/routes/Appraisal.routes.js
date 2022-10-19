// const { authJwt } = require("../middlewares");
// const { verifySignUp } = require("../middlewares");
// const verifyEmp = require("../middlewares/verifyEmp");
const controller = require("../controllers/appraisal.controller");
const { application } = require("express");

module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "authorization, Origin, Content-Type, Accept");
//     next();
//   });
//   app.get("/api/emp/getAllEmp/", [authJwt.verifyToken(["ADMIN", "BM", "FO"])], controller.getAllEmp);

// app.get("/api/role/getRole", controller.getRole);

// app.post("/api/role/addRole", controller.addRole);
// app.put("/api/role/updateRole", controller.updateRole);
app.get("/api/appraisal/getAppraisalPool", controller.getAppraisalPool);
app.post("/api/appraisal/addNewAppraisal", controller.addNewAppraisal);
app.put("/api/appraisal/updateAppraisal", controller.updateAppraisal);
app.post("/api/appraisal/cancelAppraisal/:id", controller.cancelAppraisal);
app.put("/api/appraisal/editByEmployee/", controller.editByEmployee);
app.get("/api/appraisal/getSelfAppraisal/:id", controller.getSelfAppraisal);
app.get("/api/appraisal/appraisalDetailManager/:id", controller.appraisalDetailManager);
app.put("/api/appraisal/editByReportingPerson/", controller.editByReportingPerson);

};