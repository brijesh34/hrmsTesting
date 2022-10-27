// const { authJwt } = require("../middlewares");
// const { verifySignUp } = require("../middlewares");
// const verifyEmp = require("../middlewares/verifyEmp");
const controller = require("../controllers/login.controller");
const { application } = require("express");

module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "authorization, Origin, Content-Type, Accept");
//     next();
//   });
//   app.get("/api/emp/getAllEmp/", [authJwt.verifyToken(["ADMIN", "BM", "FO"])], controller.getAllEmp);

// app.get("/api/role/getRole", controller.getRole);

app.post("/api/login/login", controller.login);
app.post("/api/login/sendPassword", controller.sendPassword);
app.put("/api/login/updatePassword", controller.updatePassword);

// app.put("/api/role/updateRole", controller.updateRole);

};