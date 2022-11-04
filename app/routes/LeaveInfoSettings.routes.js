const controller = require("../controllers/leaveInfoSettings.controller");
const { application } = require("express");

module.exports = function (app) {
    const authJwt = require("../middlewares/authJwt");

    app.get("/api/leaveInfoSettings/leaveTypesDetail", authJwt.verifyToken, controller.leaveTypesDetail);
    app.get("/api/leaveInfoSettings/leaveCategoryDetail", authJwt.verifyToken, controller.leaveCategoryDetail);

    app.post("/api/leaveInfoSettings/addLeaveType", authJwt.verifyToken, controller.addLeaveType);
    app.put("/api/leaveInfoSettings/updateLeaveType", authJwt.verifyToken, controller.updateLeaveType);

    app.post("/api/leaveInfoSettings/addLeaveCategory", authJwt.verifyToken, controller.addLeaveCategory);
    app.put("/api/leaveInfoSettings/updateLeaveCategory", authJwt.verifyToken, controller.updateLeaveCategory);

};