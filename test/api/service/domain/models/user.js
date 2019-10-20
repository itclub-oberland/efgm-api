let {db} = require("@test/integration");
const User = db.user;

describe("User Model Test Suite", () => {
    it('should create a User Model instance', ()=>{
        let newUser = new User();
        expect(newUser).to.be.not.empty;
    });
});
