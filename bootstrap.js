var Datastore = require("nedb");
var request = require("request");
var usersDB = new Datastore({ filename: "users.db", autoload: true });
var friendsDB = new Datastore({ filename: "friends.db", autoload: true });
var fs = require("fs");

usersDB.remove({});
fs.readFile("./data/users.json", "utf8", function (err, data) {
  if (err) throw err;
  var obj = JSON.parse(data);
  usersDB.insert(obj);
});

friendsDB.remove({});
fs.readFile("./data/friends.json", "utf8", function (err, data) {
  if (err) throw err;
  var obj = JSON.parse(data);
  console.log(obj)
  friendsDB.insert(obj.results);
});
