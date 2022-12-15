const controller = require("../controllers/role.controller");
const { application } = require("express");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {

    app.get("/api/role/getRole", authJwt.verifyToken, controller.getRole);
    app.get("/api/role/getDesignation", authJwt.verifyToken, controller.getDesignation);

    app.get("/api/role/getRole2", authJwt.verifyToken, controller.getRole2);

    app.post("/api/role/addRole", authJwt.verifyToken, controller.addRole);
    app.post("/api/role/addDesignation", authJwt.verifyToken, controller.addDesignation);
    
    app.put("/api/role/updateRole", authJwt.verifyToken, controller.updateRole);
    app.put("/api/role/updateDesignation", authJwt.verifyToken, controller.updateDesignation);

};