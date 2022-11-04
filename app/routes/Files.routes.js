const authJwt = require("../middlewares/authJwt");

const controller = require("../controllers/files.controller");
const { application } = require("express");

module.exports = function (app) {

    app.get(`/api/files/files/:id`, authJwt.verifyToken, controller.files);


};