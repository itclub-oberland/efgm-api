let {dbConfig, should, expect} = require("../../configuration");
let userService = require("../../../src/api/service/user.service");


describe("User Model Test Suite", () => {
    before(function () {
        dbConfig.init();
    });
    describe("User Model", () => {
        it("should not be empty on initialization", (done) => {
            let userDto = {username:"Zafer", password: "hacim"};
            userService.createUser(userDto).then(user => {
                expect(user).to.be.not.empty;
                done();
            });
        })
    });
});