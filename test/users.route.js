require('dotenv').config();
let chai = require('chai')
    , expect = chai.expect
    , should = chai.should();
let request = require("request");

let BASE_URI = "http://" + process.env.HOST + ":" + process.env.PORT;

describe('Array', function () {
    describe('GET /api/users', function () {
        it('Should not be empty', function (done) {
            request(BASE_URI + "/api/users", function(err, response, body){
                expect(body).to.not.be.empty;
                done();
            });
        });
    });
});