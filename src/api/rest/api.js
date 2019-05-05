const AUTH_ROUTER = require("@api/rest/auth/authrouter").build();

const USERS_ROUTER = require("./endpoins/users");
const OFFERS_ROUTER = require("./endpoins/offers");
const PEOPLE_ROUTER = require("./endpoins/people");

AUTH_ROUTER.getRouter().use("/users/",USERS_ROUTER);
AUTH_ROUTER.getRouter().use("/offers/",OFFERS_ROUTER);
AUTH_ROUTER.getRouter().use("/people/",PEOPLE_ROUTER);

module.exports = AUTH_ROUTER.getRouter();