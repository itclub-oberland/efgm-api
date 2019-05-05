const AUTH_ROUTER = require("@api/rest/auth/authrouter").build();
const OFFER_CONTROLLER = require("@api/controller/offer.controller");

AUTH_ROUTER.define()
    .path("/")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(OFFER_CONTROLLER.getAll)
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .post(OFFER_CONTROLLER.create);

AUTH_ROUTER.define()
    .path("/:offerId")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(OFFER_CONTROLLER.getOne)
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .delete(OFFER_CONTROLLER.remove)
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .put(OFFER_CONTROLLER.update);

module.exports = AUTH_ROUTER.getRouter();
