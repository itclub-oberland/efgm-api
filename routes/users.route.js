let authRouter = require("../auth/authrouter")(require("express").Router());

let userService = require("../service/user.service");

authRouter.define()
    .path("/users")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        await userService.all()
            .then(users => {
                return res.status(200).json(users);
            })
            .catch((err) => {
                console.log("Uh oh: ", err.message);
            });
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .post(async function (req, res) {
        await userService.createUser(req.body.username, req.body.password)
            .then(user => {
                return res.status(200).json(user);
            })
    });

module.exports = authRouter.getRouter();
