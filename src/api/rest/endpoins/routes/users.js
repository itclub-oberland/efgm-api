const AUTH_ROUTER = require("@api/rest/auth/authrouter").build({mergeParams: true});
const LOGGER = require("@api/util/logger");
const HTTP_STATUS = require('http-status-codes/index');
const USER_SERVICE = require("@service/user.service");

const CONTACTS_ROUTER = require("./users/contacts");
const PROFILE_ROUTER = require("./users/profile");
const USER_ROUTER = require("./users/user");

AUTH_ROUTER.getRouter().use("/:userId/contacts/", CONTACTS_ROUTER);
AUTH_ROUTER.getRouter().use("/:userId/profile/", PROFILE_ROUTER);
AUTH_ROUTER.getRouter().use("/:userId/", USER_ROUTER);

AUTH_ROUTER.define()
    .path("/")
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

module.exports = AUTH_ROUTER.getRouter();
