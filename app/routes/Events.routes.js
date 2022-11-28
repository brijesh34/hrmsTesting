
const controller = require("../controllers/events.controller");
const { application } = require("express");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {

    app.get("/api/events/getEvents", authJwt.verifyToken, controller.getEvents);

    app.post("/api/events/addEvent", authJwt.verifyToken, controller.addEvent);
    app.put("/api/events/updateEvent", authJwt.verifyToken, controller.updateEvent);

};
