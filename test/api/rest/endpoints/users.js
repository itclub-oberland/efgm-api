let {request, BASE_URI, server, Databse} = require("@test/integration");

describe('Users Route Test Suite', function () {
    before(function (done) {
        server.start(0);
        done();
    });
    after(function (done) {
        server.close();
        done();
    });
    describe('GET /api/users', function () {
        it('Should not be empty', function (done) {
            request(BASE_URI + "/api/users", function (err, response, body) {
                expect(body).to.not.be.empty;
                done();
            });
        });
    });
});
