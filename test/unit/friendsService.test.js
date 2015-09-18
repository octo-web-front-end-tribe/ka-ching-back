var expect = require("chai").expect;
var FriendService = require("../../services/friendsService");
var Datastore = require("nedb");
console.log("titi" + process.env.KACHING_DATABASE_PATH);
var db = new Datastore({filename: process.env.KACHING_DATABASE_PATH + "/friends.db", autoload: true});

var service = new FriendService(db);

describe("Service: Friend Service", function () {
  describe("Method: getFriends", function () {
    it("should return the user friends", function (done) {
      var username = "doe";
      service.getFriends(username, function(err, response) {
        expect(response.length).to.equal(100);
        done(err);
      });
    })
  });
});
