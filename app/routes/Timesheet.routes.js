// const { authJwt } = require("../middlewares");
// const { verifySignUp } = require("../middlewares");
// const verifyEmp = require("../middlewares/verifyEmp");
const controller = require("../controllers/timesheet.controller");
const { application } = require("express");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "authorization, Origin, Content-Type, Accept");
//     next();
//   });
//   app.get("/api/emp/getAllEmp/", [authJwt.verifyToken(["ADMIN", "BM", "FO"])], controller.getAllEmp);

app.get("/api/timesheet/gettimeSheet",authJwt.verifyToken, controller.gettimeSheet);

app.post("/api/timesheet/addtimeSheet",authJwt.verifyToken, controller.addtimeSheet);
app.put("/api/timesheet/updatetimeSheet",authJwt.verifyToken, controller.updatetimeSheet);

};