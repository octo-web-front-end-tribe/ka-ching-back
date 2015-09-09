var supertest = require("supertest");
var authTestHelper = require("./test_helpers/authTestHelper");

var server = supertest.agent("http://localhost:3000");

describe("The Friends API", function() {
  beforeEach(authTestHelper.loginUser(server));
  it("should work", function(done) {
    server
      .get("/api/friends")
      .set("Authorization", 'Bearer ' + TOKEN)
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.length.should.equal(3);
        done(err);
      });
  });
});
