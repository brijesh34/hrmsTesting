const controller = require("../controllers/role.controller");
const { application } = require("express");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {

    app.get("/api/role/getRole", authJwt.verifyToken, controller.getRole);

    app.post("/api/role/addRole", authJwt.verifyToken, controller.addRole);
    app.put("/api/role/updateRole", authJwt.verifyToken, controller.updateRole);

};