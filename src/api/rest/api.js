const AUTH_ROUTER = require("@api/rest/auth/authrouter").build();

const USERS_ROUTER = require("./endpoints/users");
const OFFERS_ROUTER = require("./endpoints/offers");
const PEOPLE_ROUTER = require("./endpoints/people");
const LOG_ROUTER = require("./endpoints/logs");

AUTH_ROUTER.getRouter().use("/users/",USERS_ROUTER);
AUTH_ROUTER.getRouter().use("/offers/",OFFERS_ROUTER);
AUTH_ROUTER.getRouter().use("/people/",PEOPLE_ROUTER);
AUTH_ROUTER.getRouter().use("/logs/", LOG_ROUTER.forAdmin());

module.exports = AUTH_ROUTER.getRouter();
