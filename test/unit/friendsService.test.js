var expect = require("chai").expect;
var FriendService = require("../../services/friendsService");
var Datastore = require("nedb");
var db = new Datastore("../../database.test.db");
db.loadDatabase();

var service = new FriendService(db);

describe("Service: Friend Service", function () {
  afterEach(function() {
    db.remove({});
  });
  describe("Method: getFriends", function () {
    var friend = {
      email: "mak@octo.com",
      name: "mak"
    };
    beforeEach(function() {
      db.insert(friend);
    });
    it("should return the user friends", function (done) {
      service.getFriends(function(err, response) {
        expect(response.length).to.equal(1);
        done(err);
      });
    })
  });
  describe("Method: addFriend", function () {
    it("should add the given friend", function (done) {
      var friend = {
        name: "test",
        email: "mak@octo.com"
      };
      service.addFriend(friend, function(err, response) {
        expect(response).to.deep.equal(friend);
        done(err);
      });
    })
  });
});