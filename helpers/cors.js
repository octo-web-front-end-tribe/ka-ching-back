var CORS_HEADER = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS,HEAD",
  "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Range"
};

module.exports = {
  setCorsHeaders: function(req, res, next) {
    Object.keys(CORS_HEADER).forEach(function (key) {
      res.setHeader(key, CORS_HEADER[key]);
    });
    next();
  }
};
