var express = require("express");
var routes = require("./routes/routes.js");
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var corsHelper = require("./helpers/cors.js");
var _SECRET = "secret_a_changer";
var FriendsAPI = require("./api/friendsApi.js");
var AccountAPI = require("./api/accountApi.js");
var Datastore = require("nedb");
var _ = require("lodash");

var app = express();

var friendsDB = new Datastore({filename: process.env.KACHING_DATABASE_PATH +"/friends.db", autoload: true});
console.log('Database path : ', process.env.KACHING_DATABASE_PATH);
var friendsAPI = new FriendsAPI(friendsDB);

var usersDB = new Datastore({filename: process.env.KACHING_DATABASE_PATH +"/users.db", autoload: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use("/", routes());
app.use(corsHelper.setCorsHeaders);

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({secret: _SECRET}));

app.post('/authenticate', function (req, res) {
  if (req.body !== undefined) {
    usersDB.findOne({username: req.body.login, password: req.body.password}, function (err, profile) {
      console.log(profile)
      if (err || _.isEmpty(profile)) {
        res.send(401, 'Wrong user or password');
      }
      var token = jwt.sign(profile, _SECRET, {expiresInMinutes: 60 * 5});
      res.json({username: profile.username, token: token});
    })
  }
});

app.get('/api/restricted', function (req, res) {
  console.log('user ' + req.user.email + ' is calling /api/restricted');
  res.json({
    name: 'foo'
  });
});

app.get("/api/friends/:username", friendsAPI.getFriends);

app.get('/api/account', AccountAPI.getAccount);

app.listen(3000, function () {
  console.info('running on port 3000');
});