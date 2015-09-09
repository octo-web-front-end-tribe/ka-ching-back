var expect = require("chai").expect;
var FriendService = require("../../services/friendsService");

describe("Service: Friend Service", function() {
  describe("Method: getFriends", function() {
    it("should return the user friends", function() {
      var friends = FriendService.getFriends();
      expect(friends).to.equal("test");
    })
  });
});