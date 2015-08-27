var express = require("express");
var appController = require("../controllers/appController.js");
module.exports = function () {
  var router = express.Router();
  router.get("/", appController.getHomePage);
  router.get("/home", appController.getHomePage);
  return router;
};