const AUTH_ROUTER = require("@api/rest/auth/authrouter").build();

const PERSON_CONTROLLER = require("@api/controller/person.controller");

AUTH_ROUTER.define()
    .path("/")
    .needsAuthentication()
    .withRoles(["ROLE_ADMIN"])
    .get(PERSON_CONTROLLER.getAll)
    .and()
    .needsAuthentication()
    .withRoles(["ROLE_ADMIN"])
    .post(PERSON_CONTROLLER.create);


AUTH_ROUTER.define()
    .path("/:personId")
    .needsAuthentication()
    .withRoles(["ROLE_ADMIN"])
    .get(PERSON_CONTROLLER.getOne)
    .and()
    .needsAuthentication()
    .withRoles(["ROLE_ADMIN"])
    .delete(PERSON_CONTROLLER.remove)
    .and()
    .needsAuthentication()
    .withRoles(["ROLE_ADMIN"])
    .put(PERSON_CONTROLLER.update);

module.exports = AUTH_ROUTER.getRouter();
