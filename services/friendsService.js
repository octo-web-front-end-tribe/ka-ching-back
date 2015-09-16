module.exports = function (db) {
  return {
    getFriends: function getFriends(username, callback) {
      db.find({username: username}, function (err, docs) {
        if (err) {
          return callback(err);
        }
        return callback(null, docs[0].friends)
      });
    }
  }
};