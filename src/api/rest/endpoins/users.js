const AUTH_ROUTER = require("../auth/authrouter")(require("express").Router());
const LOGGER = require("../../util/logger");
const HTTP_STATUS = require('http-status-codes');

const USER_SERVICE = require("../../service/user.service");

AUTH_ROUTER.define()
    .path("/users")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        await USER_SERVICE.findAll()
            .then(users => {
                if (users) {
                    return res.status(HTTP_STATUS.OK).json(users);
                } else {
                    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Couldn't get Users! An error occurred."});
                }
            })
            .catch((err) => {
                LOGGER.error("Getting users failed:", err);
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Couldn't get User! An error occurred."});
            });
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .post(async function (req, res) {
        await USER_SERVICE.createUser(req.body.username, req.body.password)
            .then(user => {
                if (user) {
                    return res.status(HTTP_STATUS.OK).json(user);
                } else {
                    return res.status(HTTP_STATUS.BAD_REQUEST).json();
                }
            }).catch(err => {
                LOGGER.error("Creating user failed:", err);
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Couldn't create User! An error occurred."});
            });
    });


AUTH_ROUTER.define()
    .path("/users/:id")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        await USER_SERVICE.getUserById(req.params.id)
            .then((user) => {
                if (user) {
                    return res.status(HTTP_STATUS.OK).json(user);
                } else {
                    return res.status(HTTP_STATUS.NOT_FOUND).json({message: "User not found"})
                }
            }).catch(err => {
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Couldn't get User! An error occurred."});
            });
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .delete(async function (req, res) {
        await USER_SERVICE.removeUserById(req.params.id)
            .then(operationStatus => {
                if (operationStatus) {
                    return res.status(HTTP_STATUS.OK);
                } else {
                    return res.status(HTTP_STATUS.NOT_FOUND);
                }
            }).catch((err) => {
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Couldn't delete User! An error occurred."});
            });
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .put(async function (req, res) {
        let userObj = {username: req.body.username, password: req.body.password, role: req.body.role};
        await USER_SERVICE.updateUserById(req.params.id, userObj)
            .then((updatedUser) => {
                if (updatedUser) {
                    return res.status(HTTP_STATUS.OK).json(updatedUser);
                } else {
                    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Couldn't update User! An error occurred."});
                }
            })
            .catch((err) => {
                LOGGER.error("Updating user failed:", err);
                return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Couldn't update User! An error occured."});
            });
    });

module.exports = AUTH_ROUTER.getRouter();
