const AUTH_ROUTER = require("@api/rest/auth/authrouter").build({mergeParams: true});

const USER_CONTROLLER = require("@api/controller/user.controller");
const PROFILE_CONTROLLER = require("@api/controller/profile.controller");

AUTH_ROUTER.define()
    .path("/")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(USER_CONTROLLER.getAll)
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .post(USER_CONTROLLER.create);

AUTH_ROUTER.define()
    .path("/:userId")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(USER_CONTROLLER.getOne)
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .delete(USER_CONTROLLER.remove)
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .put(USER_CONTROLLER.update);

AUTH_ROUTER.define()
// .needsAuthentication()
// .withRoles(["ROLE_USER"])
    .path("/:userId/profile")
    .get(PROFILE_CONTROLLER.getOne)
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_USER"])
    .put(PROFILE_CONTROLLER.update);

module.exports = AUTH_ROUTER.getRouter();
