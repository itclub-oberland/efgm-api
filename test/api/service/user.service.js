let {db} = require("@test/integration");
let userService = require("@service/user.service");
const User = db.user;

describe("User Service Test Suite", () => {
    beforeEach(function (done) {
        User.destroy({
            where: {},
            truncate: true
        }).then(() => {
            done();
        });
    });
    it("should create user", (done) => {
        let userDto = {username: "Zafer", password: "hacim"};
        userService.createUser(userDto).then(user => {
            expect(user).to.be.not.empty;
            expect(user.dataValues.username).to.be.equal("Zafer");
            done();
        });
    });
    it("should hash the password on create", (done) => {
        let userDto = {username: "Zafer", password: "hacim"};
        userService.createUser(userDto).then(user => {
            expect(user.dataValues.password).to.be.not.equal("hacim");
            done();
        });
    });
});
