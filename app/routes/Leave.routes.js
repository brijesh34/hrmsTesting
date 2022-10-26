// const { authJwt } = require("../middlewares");
// const { verifySignUp } = require("../middlewares");
// const verifyEmp = require("../middlewares/verifyEmp");
const controller = require("../controllers/leave.controller");
const { application } = require("express");

module.exports = function (app) {
    //   app.use(function (req, res, next) {
    //     res.header("Access-Control-Allow-Headers", "authorization, Origin, Content-Type, Accept");
    //     next();
    //   });
    //   app.get("/api/emp/getAllEmp/", [authJwt.verifyToken(["ADMIN", "BM", "FO"])], controller.getAllEmp);

    app.get("/api/leave/getPersonalLeave/:id", controller.getPersonalLeave);

    app.post("/api/leave/addLeave", controller.addLeave);
    app.put("/api/leave/updateLeaveBySelf", controller.updateLeaveBySelf);
    app.post("/api/leave/delete/:id", controller.delete_self_leave);
    app.get("/api/leave/pendingLeave/:id", controller.pendingLeave);

    app.get("/api/leave/leaveManagementInfo/:id", controller.leaveManagementInfo);
    app.put("/api/leave/updateLeaveByManager", controller.updateLeaveByManager);


    // app.put("/api/role/updateRole", controller.updateRole);

};