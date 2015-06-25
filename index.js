var express = require("express");
var routes = require("./routes/routes.js");
var corsHelper = require("./helpers/cors.js");

var app = express();

app.use("/", routes());
app.use(corsHelper.setCorsHeaders);

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

});