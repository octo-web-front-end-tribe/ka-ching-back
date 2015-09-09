var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

var TOKEN;

describe("SAMPLE unit test",function(){

    // #1 should return home page

    it('login', loginUser());
    it("should return home page",function(done){
        console.log(TOKEN);
        // calling home page api
        server
            .get("/api/friends")
            .set("Authorization", 'Bearer ' +  TOKEN)
            .expect("Content-type",/json/)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.length.should.equal(3);
                done();
            });
    });

});

function loginUser() {
    return function(done) {
        server
            .post('/authenticate')
            .send({ login: 'john.doe', password: 'foobar' })
            .expect(200)
            .end(onResponse);

        function onResponse(err, res) {
            if (err) return done(err);
            TOKEN = res.body.token;
            return done();
        }
    };
};