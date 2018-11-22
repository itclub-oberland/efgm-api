let authRouter = require("../auth/authrouter")(require("express").Router());
const logger = require("../util/logger");
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


authRouter.define()
    .path("/users/:id")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .delete(async function (req, res) {
        await userService.removeUserById(req.params.id)
            .then(operationStatus => {
                if (operationStatus) {
                    return res.status(200);
                } else {
                    return res.status(404);
                }
            }).catch((err) => {
                return res.status(500).json({message: "Couldn't delete User! An error occurred."});
            })
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .put(async function (req, res) {
        let userObj = {username: req.body.username, password: req.body.password, role: req.body.role};
        await userService.updateUserById(req.params.id, userObj)
            .then((updatedUser) => {
                return res.status(200).json(updatedUser);
            })
            .catch((err) => {
                logger.error("Updating user failed:", err);
                return res.status(500).json({message: "Couldn't update User! An error occured."});
            });
    });

module.exports = authRouter.getRouter();
