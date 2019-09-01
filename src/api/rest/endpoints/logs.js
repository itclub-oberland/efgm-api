const AUTH_ROUTER = require("@api/rest/auth/authrouter").build({mergeParams: true});

const LOG_CONTROLLER = require("@api/controller/log.controller");

function defineRoutes(roles) {
    AUTH_ROUTER.define()
        .path("/")
        .needsAuthentication()
        .withRoles(roles)
        .get(LOG_CONTROLLER.getAll)
        .and()
        .needsAuthentication()
        .withRoles(roles)
        .post(LOG_CONTROLLER.create);

    AUTH_ROUTER.define()
        .path("/:logId")
        .needsAuthentication()
        .withRoles(roles)
        .get(LOG_CONTROLLER.getOne)
        .and()
        .needsAuthentication()
        .withRoles(roles)
        .put(LOG_CONTROLLER.update)
        .and()
        .needsAuthentication()
        .withRoles(roles)
        .delete(LOG_CONTROLLER.remove);
    return AUTH_ROUTER.getRouter();
}

function forAdmin() {
    return defineRoutes(["ROLE_USER", "ROLE_ADMIN"])
}

function forUser() {
    return defineRoutes(["ROLE_USER"])
}

module.exports = {
    forAdmin,
    forUser
};
