const controller = require("../controllers/projectInfo.controller");
const { application } = require("express");

module.exports = function (app) {
//   app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Headers", "authorization, Origin, Content-Type, Accept");
//     next();
//   });
//   app.get("/api/emp/getAllEmp/", [authJwt.verifyToken(["ADMIN", "BM", "FO"])], controller.getAllEmp);

app.get("/api/project/projectInfo", controller.projectInfo);

app.post("/api/project/addProject", controller.addProject);
app.put("/api/project/updateProject", controller.updateProject);

};