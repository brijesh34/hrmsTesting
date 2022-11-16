const controller = require("../controllers/timesheet.controller");
const { application } = require("express");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {

    app.get("/api/timesheet/gettimeSheet/:id", authJwt.verifyToken, controller.gettimeSheet);
    app.get("/api/timesheet/gettimeSheet1/:id", authJwt.verifyToken, controller.gettimeSheet1);

    app.post("/api/timesheet/addtimeSheet", authJwt.verifyToken, controller.addtimeSheet);
    app.put("/api/timesheet/updatetimeSheet", authJwt.verifyToken, controller.updatetimeSheet);

};