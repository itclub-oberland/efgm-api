const AUTH_ROUTER = require("../auth/authrouter").build();
const LOGGER = require("../../util/logger");
const HTTP_STATUS = require('http-status-codes');
const USER_SERVICE = require("../../service/user.service");

AUTH_ROUTER.define()
    .path("/users")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        let users = await USER_SERVICE.findAll();
        if (users) {
            return res.status(HTTP_STATUS.OK).json(users);
        }
        throw {message: "Users couldn't be retrieved!"};
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .post(async function (req, res) {
        let userDto = {username, password} = req.body;
        let user = await USER_SERVICE.createUser(userDto);
        if (user) {
            LOGGER.info("User created:", user);
            return res.status(HTTP_STATUS.OK).json(user);
        } else {
            return res.status(HTTP_STATUS.BAD_REQUEST).json();
        }
    });


AUTH_ROUTER.define()
    .path("/users/:id")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        let user = await USER_SERVICE.getUserById(req.params.id);
        if (user) {
            return res.status(HTTP_STATUS.OK).json(user);
        } else {
            return res.status(HTTP_STATUS.NOT_FOUND).json({message: "User not found"})
        }
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .delete(async function (req, res) {
        let operationStatus = Boolean(await USER_SERVICE.removeUserById(req.params.id));
        if (operationStatus) {
            LOGGER.info(`User with id ${req.params.id} deleted.`);
            return res.status(HTTP_STATUS.OK).json();
        } else {
            return res.status(HTTP_STATUS.NOT_FOUND).json();
        }
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .put(async function (req, res) {
        let userObj = {username, password} = req.body;
        let updatedPerson = await USER_SERVICE.updateUserById(req.params.id, userObj);
        if (updatedPerson) {
            LOGGER.info("User updated:", updatedPerson);
            return res.status(HTTP_STATUS.NO_CONTENT).json();
        } else {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Couldn't update User!"});
        }
    });

module.exports = AUTH_ROUTER.getRouter();
