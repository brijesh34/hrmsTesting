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

app.get("/api/leaveInfoSettings/leaveTypesDetail", controller.leaveTypesDetail);
app.get("/api/leaveInfoSettings/leaveCategoryDetail", controller.leaveCategoryDetail);

app.post("/api/leaveInfoSettings/addLeaveType", controller.addLeaveType);
app.put("/api/leaveInfoSettings/updateLeaveType", controller.updateLeaveType);

app.post("/api/leaveInfoSettings/addLeaveCategory", controller.addLeaveCategory);
app.put("/api/leaveInfoSettings/updateLeaveCategory", controller.updateLeaveCategory);


// app.post("/api/role/addRole", controller.addRole);
// app.put("/api/role/updateRole", controller.updateRole);

};