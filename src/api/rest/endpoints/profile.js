const AUTH_ROUTER = require("@api/rest/auth/authrouter").build({mergeParams: true});

const PROFILE_CONTROLLER = require("@api/controller/profile.controller");

AUTH_ROUTER.define()
    .path("/")
    .needsAuthentication()
    .withRoles(["ROLE_USER"])
    .get(PROFILE_CONTROLLER.getOne)
    .and()
    .needsAuthentication()
    .withRoles(["ROLE_USER"])
    .put(PROFILE_CONTROLLER.update);

module.exports = AUTH_ROUTER.getRouter();
