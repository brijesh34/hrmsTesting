const controller = require("../controllers/leave.controller");
const { application } = require("express");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {

    app.get("/api/leave/getPersonalLeave/:id", authJwt.verifyToken, controller.getPersonalLeave);

    app.post("/api/leave/addLeave", authJwt.verifyToken, controller.addLeave);
    app.put("/api/leave/updateLeaveBySelf", authJwt.verifyToken, controller.updateLeaveBySelf);
    app.post("/api/leave/delete_self_leave/:id", authJwt.verifyToken, controller.delete_self_leave);
    app.get("/api/leave/pendingLeave/:id", authJwt.verifyToken, controller.pendingLeave);
    app.get("/api/leave/detailPersonal/:id", authJwt.verifyToken, controller.detailPersonal);
    app.get("/api/leave/leaveReport/:id", authJwt.verifyToken, controller.leaveReport);

    app.get("/api/leave/leaveManagementInfo/:id", authJwt.verifyToken, controller.leaveManagementInfo);
    app.put("/api/leave/updateLeaveByManager", authJwt.verifyToken, controller.updateLeaveByManager);


};