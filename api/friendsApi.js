var FriendsService = require("../services/friendsService");

module.exports = function (database) {
  var friendsService = new FriendsService(database);
  return {
    getFriends: function getFriends(req, res) {
      friendsService.getFriends(req.params.username, function (err, friends) {
        if (err) {
          return res.error(err);
        }
        return res.send(friends);
      });
    }
  }
};
