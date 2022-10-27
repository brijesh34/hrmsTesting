
const controller = require("../controllers/files.controller");
const { application } = require("express");

module.exports = function (app) {

app.post("/api/files/files", controller.files);


};