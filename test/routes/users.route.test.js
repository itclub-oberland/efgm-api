let {request, expect, BASE_URI} = require("../configuration");

describe('Users Route Test Suite', function () {
    describe('GET /api/users', function () {
        it('Should not be empty', function (done) {
            request(BASE_URI + "/api/users", function (err, response, body) {
                expect(body).to.not.be.empty;
                done();
            });
        });
    });
});