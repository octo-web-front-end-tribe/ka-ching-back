module.exports = function (db) {
  return {
    getFriends: function getFriends(callback) {
      db.find({}, function (err, docs) {
        if (err) {
          return callback(err);
        }
        return callback(null, docs)
      });
    },
    addFriend: function addFriend(friend, callback) {
      db.insert(friend, function (err, newDoc) {
        if (err) {
          return callback(err);
        }
        return callback(null, newDoc);
      });
    }
  }
};