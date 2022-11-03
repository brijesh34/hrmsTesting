// const { authJwt } = require("../middlewares");
// const { verifySignUp } = require("../middlewares");
// const verifyEmp = require("../middlewares/verifyEmp");
const controller = require("../controllers/leave.controller");
const { application } = require("express");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {
    //   app.use(function (req, res, next) {
    //     res.header("Access-Control-Allow-Headers", "authorization, Origin, Content-Type, Accept");
    //     next();
    //   });
    //   app.get("/api/emp/getAllEmp/", [authJwt.verifyToken(["ADMIN", "BM", "FO"])], controller.getAllEmp);

    app.get("/api/leave/getPersonalLeave/:id",authJwt.verifyToken, controller.getPersonalLeave);

    app.post("/api/leave/addLeave", authJwt.verifyToken,controller.addLeave);
    app.put("/api/leave/updateLeaveBySelf", authJwt.verifyToken,controller.updateLeaveBySelf);
    app.post("/api/leave/delete/:id",authJwt.verifyToken, controller.delete_self_leave);
    app.get("/api/leave/pendingLeave/:id",authJwt.verifyToken, controller.pendingLeave);
    app.get("/api/leave/detailPersonal/:id",authJwt.verifyToken, controller.detailPersonal);
    app.get("/api/leave/leaveReport/:id",authJwt.verifyToken, controller.leaveReport);

    app.get("/api/leave/leaveManagementInfo/:id",authJwt.verifyToken, controller.leaveManagementInfo);
    app.put("/api/leave/updateLeaveByManager",authJwt.verifyToken, controller.updateLeaveByManager);


    // app.put("/api/role/updateRole", controller.updateRole);

};