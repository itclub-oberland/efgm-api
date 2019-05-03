const AUTH_ROUTER = require("@api/rest/auth/authrouter").build({mergeParams: true});
const LOGGER = require("@api/util/logger");
const HTTP_STATUS = require('http-status-codes/index');
const USER_SERVICE = require("@service/user.service");

AUTH_ROUTER.define()
// .needsAuthentication()
// .withRoles(["ROLE_USER"])
    .path("/")
    .get(async function (req, res) {
        // TODO: implement
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_USER"])
    .post(async function (req, res) {
        // TODO: implement
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_USER"])
    .put(async function (req, res) {
        // TODO: implement
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_USER"])
    .delete(async function (req, res) {
        // TODO: implement
    });

module.exports = AUTH_ROUTER.getRouter();
