const controller = require("../controllers/projectInfo.controller");
const { application } = require("express");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "authorization, Origin, Content-Type, Accept");
//     next();
//   });
//   app.get("/api/emp/getAllEmp/", [authJwt.verifyToken(["ADMIN", "BM", "FO"])], controller.getAllEmp);

app.get("/api/project/projectInfo",authJwt.verifyToken, controller.projectInfo);

app.post("/api/project/addProject",authJwt.verifyToken, controller.addProject);
app.put("/api/project/updateProject",authJwt.verifyToken, controller.updateProject);

};