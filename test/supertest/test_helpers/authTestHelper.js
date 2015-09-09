module.exports = {
  loginUser: function loginUser(server) {
    return function (done) {
      server
        .post('/authenticate')
        .send({login: 'john.doe', password: 'foobar'})
        .expect(200)
        .end(onResponse);

      function onResponse(err, res) {
        if (err) return done(err);
        TOKEN = res.body.token;
        return done();
      }
    };
  }
};