var FriendsService = require("../services/friendsService");

module.exports = function(database) {
  var friendsService = new FriendsService(database);
  return {
    getFriends: function getFriends(req, res) {
      friendsService.getFriends(function(err, friends) {
        if (err) {
          return res.send(err);
        }
        console.log(friends);
        return res.send(friends);
      });
    }
  }
};
