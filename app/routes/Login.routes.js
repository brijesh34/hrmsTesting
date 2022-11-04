const controller = require("../controllers/login.controller");
const { application } = require("express");

module.exports = function (app) {

    app.post("/api/login/login", controller.login);
    app.post("/api/login/sendPassword", controller.sendPassword);
    app.put("/api/login/updatePassword", controller.updatePassword);


};