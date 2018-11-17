let authRouter = require("../auth/authrouter")(require("express").Router());

/* GET home page. */
authRouter.define()
    .path("/")
    .get(function (req, res) {
        res.redirect('/api-docs');
    });

module.exports = authRouter.getRouter();
