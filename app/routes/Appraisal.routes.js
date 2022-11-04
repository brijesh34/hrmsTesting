const controller = require("../controllers/appraisal.controller");
const { application } = require("express");
const authJwt = require("../middlewares/authJwt");

module.exports = function (app) {
    app.get("/api/appraisal/getAppraisalPool", authJwt.verifyToken, controller.getAppraisalPool);
    app.post("/api/appraisal/addNewAppraisal", authJwt.verifyToken, controller.addNewAppraisal);
    app.put("/api/appraisal/updateAppraisal", authJwt.verifyToken, controller.updateAppraisal);
    app.post("/api/appraisal/cancelAppraisal/:id", authJwt.verifyToken, controller.cancelAppraisal);
    app.put("/api/appraisal/editByEmployee/", authJwt.verifyToken, controller.editByEmployee);
    app.get("/api/appraisal/getSelfAppraisal/:id", authJwt.verifyToken, controller.getSelfAppraisal);
    app.get("/api/appraisal/appraisalDetailManager/:id", authJwt.verifyToken, controller.appraisalDetailManager);
    app.put("/api/appraisal/editByReportingPerson/", authJwt.verifyToken, controller.editByReportingPerson);
    app.get("/api/appraisal/appraisalDetailStatus/:id", authJwt.verifyToken, controller.appraisalDetailStatus);
    app.get("/api/appraisal/appraisalDetailStatusPersonal/:id", authJwt.verifyToken, controller.appraisalDetailStatusPersonal);

};