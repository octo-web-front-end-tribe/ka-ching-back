module.exports = {
  getFriends: function getFriends(req, res, next) {
    return res.send([
      "Zidane", "Seedorf", "Davids"
    ]);
  }

};