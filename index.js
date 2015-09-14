var express = require("express");
var routes = require("./routes/routes.js");
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var corsHelper = require("./helpers/cors.js");
var _SECRET = "secret_a_changer";
var FriendsAPI = require("./api/friendsApi.js")
var AccountAPI = require("./api/accountApi.js")
var Datastore = require("nedb");

var app = express();

var database = new Datastore("database.db");
var friendsAPI = new FriendsAPI(database);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use("/", routes());
app.use(corsHelper.setCorsHeaders);

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({secret: _SECRET}));

app.post('/authenticate', function (req, res) {
    //TODO validate req.body.username and req.body.password
    //if is invalid, return 401
    if (req.body === undefined || (!(req.body.login === 'john.doe' && req.body.password === 'foobar'))) {
        res.send(401, 'Wrong user or password');
        return;
    }

    var profile = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@doe.com',
        id: 123
    };

    // We are sending the profile inside the token
    var token = jwt.sign(profile, _SECRET, {expiresInMinutes: 60 * 5});

    res.json({token: token});
});

app.get('/api/restricted', function (req, res) {
    console.log('user ' + req.user.email + ' is calling /api/restricted');
    res.json({
        name: 'foo'
    });
});

app.get("api/friends", friendsAPI.getFriends);

app.get('/api/account', AccountAPI.getAccount);

var server = app.listen(3000, function () {
    console.info('running on port 3000');
});