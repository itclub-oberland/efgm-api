let {request, BASE_URI, server} = require("@test/integration");
const HTTP_STATUS = require('http-status-codes');
const USER_SERVICE = require("@service/user.service");

function authenticated(callback) {
    request({
        method: 'POST',
        url: BASE_URI + "/auth/login",
        json: {
            username: 'admin',
            password: 'admin'
        }
    }, function (err, response, body) {
        callback(body.token);
    });
}

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
        it('should not allow unauthorized access', function (done) {
            request(BASE_URI + "/api/users", function (err, response) {
                expect(response.statusCode).to.be.equal(HTTP_STATUS.UNAUTHORIZED);
                done();
            });
        });
        it('should return empty array when no users', function (done) {
            authenticated((token) => {
                request({
                    method: 'GET',
                    url: BASE_URI + "/api/users",
                    auth: {
                        bearer: token
                    }
                }, function (err, response, body) {
                    expect(response.statusCode).to.be.not.equal(HTTP_STATUS.FORBIDDEN);
                    expect(response.statusCode).to.be.equal(HTTP_STATUS.OK);
                    let result = JSON.parse(body);
                    expect(result).to.be.not.empty;
                    expect(result.length).to.be.equal(1);
                    done();
                });
            })
        });
        it('should return array with users', function (done) {
            let userDto = {username: "Zafer", password: "hacim"};
            USER_SERVICE.createUser(userDto).then(() => {
                authenticated((token) => {
                    request({
                        method: 'GET',
                        url: BASE_URI + "/api/users",
                        auth: {
                            bearer: token
                        }
                    }, function (err, response, body) {
                        expect(response.statusCode).to.be.not.equal(HTTP_STATUS.FORBIDDEN);
                        expect(response.statusCode).to.be.equal(HTTP_STATUS.OK);
                        let result = JSON.parse(body);
                        expect(Array.isArray(result)).to.be.true;
                        expect(result.length).to.be.equal(2);
                        done();
                    });
                })
            });
        });
    });
    describe('POST /api/users', function () {
        it('Should create new user', function (done) {
            authenticated((token) => {
                request({
                    method: 'POST',
                    url: BASE_URI + "/api/users",
                    auth: {
                        bearer: token
                    },
                    json: {
                        username: "Zafer1",
                        password: "zmote"
                    }
                }, function (err, response, body) {
                    expect(response.statusCode).to.be.not.equal(HTTP_STATUS.FORBIDDEN);
                    expect(response.statusCode).to.be.equal(HTTP_STATUS.OK);
                    let result = body;
                    expect(typeof result).to.be.equal("object");
                    expect(result.username).to.be.equal("Zafer1");
                    done();
                });
            })
        });
    });
    describe('GET /api/users/:userId', function () {
        it('Admin should be able to access himself');
        it('Admin should be able to access other user');
        it('User should be able to access himself');
        it('User should not be able to access another user');
    });
    describe('PUT /api/users/:userId', function () {
        it('Admin should be able to update himself');
        it('Admin should be able to update another user');
        it('User should be able to update himself');
        it('User should not be able to update another user');
    });
    describe('DELETE /api/users/:userId', function () {
        it('Admin should be able to delete himself');
        it('Admin should be able to delete another user');
        it('User should be able to delete himself');
        it('User should not be able to delete another user');
    });
});
