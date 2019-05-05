const AUTH_ROUTER = require("@api/rest/auth/authrouter").build();

const AUTH_CONTROLLER = require("@api/controller/auth.controller");

AUTH_ROUTER.define()
    .path("/login")
    .post(AUTH_CONTROLLER.login);

AUTH_ROUTER.define()
    .path("/signup")
    .post(AUTH_CONTROLLER.signup);

module.exports = AUTH_ROUTER.getRouter();