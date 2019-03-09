let {should, expect} = require("../../configuration");
let userService = require("../../../src/api/service/user.service");


describe("User Model Test Suite", () => {
    describe("User Model", () => {
        it("should not be empty on initialization", (done) => {
            let createdUser = userService.createUser("Zafer", "hacim").then(user=>{
               expect(createdUser).to.be.not.empty;
               done();
            });
        })
    });
});