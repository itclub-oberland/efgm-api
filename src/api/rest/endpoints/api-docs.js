const AUTH_ROUTER = require("@api/rest/auth/authrouter").build();

/* GET home page. */
AUTH_ROUTER.define()
    .path("/")
    .get(function (req, res) {
        res.redirect('/api-docs');
    });

module.exports = AUTH_ROUTER.getRouter();
