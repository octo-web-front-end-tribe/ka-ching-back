var supertest = require("supertest");
var authentificationHelper = require("../helpers/authentificationHelper");
var expect = require("chai").expect;

describe("API: FriendsApi", function() {

    var server = supertest.agent("http://localhost:3000");

    beforeEach(authentificationHelper.authentify(server));
    describe("the /api/friends endpoint", function() {
      it("should return the friends", function(done) {
        var username = "doe";
        server.get("/api/friends/" + username)
          .set("Authorization", 'Bearer ' + TOKEN)
          .expect(200)
          .end(function(err, res) {
            expect(res.body.length).to.equal(100);
            done(err)
          });
      });
    })
  }
);