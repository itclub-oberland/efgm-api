let authRouter = require("../auth/authrouter")(require("express").Router());
const logger = require("../../util/logger");
let HttpStatus = require('http-status-codes');

let userService = require("../../service/user.service");

authRouter.define()
    .path("/users")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        await userService.findAll()
            .then(users => {
                res.status(HttpStatus.OK).json(users);
            })
            .catch((err) => {
                console.log("Uh oh: ", err.message);
                res.status(HttpStatus.BAD_REQUEST).json();
            });
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .post(async function (req, res) {
        await userService.createUser(req.body.username, req.body.password)
            .then(user => {
                res.status(HttpStatus.OK).json(user);
            }).catch(err => {
                console.log("Uh oh:", err.message);
                res.status(HttpStatus.BAD_REQUEST).json();
            });
    });


authRouter.define()
    .path("/users/:id")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        await userService.getUserById(req.params.id).then((user) => {
            if (user) {
                res.status(HttpStatus.OK).json(user);
            } else {
                res.status(HttpStatus.NOT_FOUND).json({message: "User not found"})
            }
        });
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .delete(async function (req, res) {
        await userService.removeUserById(req.params.id)
            .then(operationStatus => {
                if (operationStatus) {
                    return res.status(HttpStatus.OK);
                } else {
                    return res.status(HttpStatus.NOT_FOUND);
                }
            }).catch((err) => {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Couldn't delete User! An error occurred."});
            })
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .put(async function (req, res) {
        let userObj = {username: req.body.username, password: req.body.password, role: req.body.role};
        await userService.updateUserById(req.params.id, userObj)
            .then((updatedUser) => {
                return res.status(HttpStatus.OK).json(updatedUser);
            })
            .catch((err) => {
                logger.error("Updating user failed:", err);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Couldn't update User! An error occured."});
            });
    });

module.exports = authRouter.getRouter();
