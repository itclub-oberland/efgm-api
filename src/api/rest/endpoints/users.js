const AUTH_ROUTER = require("@api/rest/auth/authrouter").build({mergeParams: true});

const USER_CONTROLLER = require("@api/controller/user.controller");

const LOG_ROUTER = require("@api/rest/endpoints/logs");
const PROFILE_ROUTER = require("@api/rest/endpoints/profile");

AUTH_ROUTER.getRouter().use("/:userId/logs", LOG_ROUTER.forUser());
AUTH_ROUTER.getRouter().use("/:userId/profile", PROFILE_ROUTER);

AUTH_ROUTER.define()
    .path("/")
    .needsAuthentication()
    .withRoles(["ROLE_ADMIN"])
    .get(USER_CONTROLLER.getAll)
    .and()
    .needsAuthentication()
    .withRoles(["ROLE_ADMIN"])
    .post(USER_CONTROLLER.create);

AUTH_ROUTER.define()
    .path("/:userId")
    .needsAuthentication()
    .withRoles(["ROLE_ADMIN"])
    .get(USER_CONTROLLER.getOne)
    .and()
    .needsAuthentication()
    .withRoles(["ROLE_ADMIN"])
    .delete(USER_CONTROLLER.remove)
    .and()
    .needsAuthentication()
    .withRoles(["ROLE_ADMIN"])
    .put(USER_CONTROLLER.update);

module.exports = AUTH_ROUTER.getRouter();
