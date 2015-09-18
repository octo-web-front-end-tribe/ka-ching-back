var Datastore = require("nedb");
var request = require("request");
var usersDB = new Datastore({ filename: process.env.database_path + "/users.db", autoload: true });
var friendsDB = new Datastore({ filename: process.env.database_path + "/friends.db", autoload: true });
var fs = require("fs");

usersDB.remove({});
fs.readFile("./data/users.json", "utf8", function (err, data) {
  if (err) throw err;
  var obj = JSON.parse(data);
  usersDB.insert(obj.results);
});

friendsDB.remove({});
fs.readFile("./data/friends.json", "utf8", function (err, data) {
  if (err) throw err;
  var obj = JSON.parse(data);
  friendsDB.insert(obj.results);
});
