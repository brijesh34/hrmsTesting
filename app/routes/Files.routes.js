
const controller = require("../controllers/files.controller");
const { application } = require("express");

module.exports = function (app) {

app.get(`/api/files/files/:id`, controller.files);


};