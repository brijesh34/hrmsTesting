// const { authJwt } = require("../middlewares");
// const { verifySignUp } = require("../middlewares");
// const verifyEmp = require("../middlewares/verifyEmp");
const controller = require("../controllers/leaveInfoSettings.controller");
const { application } = require("express");

module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "authorization, Origin, Content-Type, Accept");
//     next();
//   });
//   app.get("/api/emp/getAllEmp/", [authJwt.verifyToken(["ADMIN", "BM", "FO"])], controller.getAllEmp);
const authJwt = require("../middlewares/authJwt");

app.get("/api/leaveInfoSettings/leaveTypesDetail",authJwt.verifyToken, controller.leaveTypesDetail);
app.get("/api/leaveInfoSettings/leaveCategoryDetail",authJwt.verifyToken, controller.leaveCategoryDetail);

app.post("/api/leaveInfoSettings/addLeaveType",authJwt.verifyToken, controller.addLeaveType);
app.put("/api/leaveInfoSettings/updateLeaveType",authJwt.verifyToken, controller.updateLeaveType);

app.post("/api/leaveInfoSettings/addLeaveCategory",authJwt.verifyToken, controller.addLeaveCategory);
app.put("/api/leaveInfoSettings/updateLeaveCategory",authJwt.verifyToken, controller.updateLeaveCategory);


// app.post("/api/role/addRole", controller.addRole);
// app.put("/api/role/updateRole", controller.updateRole);

};