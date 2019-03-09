const authRouter = require("../auth/authrouter")(require("express").Router());
const jwt = require("jsonwebtoken");
let HttpStatus = require('http-status-codes');
const userService = require("../../service/user.service");

authRouter.define()
    .path("/login")
    .post(async function (req, res) {
        await userService.getUserByUsername(req.body.username).then(async (user) => {
            if (user !== null && await user.validPassword(req.body.password)) {
                const payload = {
                    user: user.username
                };
                let token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: 86400  // expires in 24 hours
                });

                res.status(HttpStatus.OK).json({token});
            } else {
                res.status(HttpStatus.UNAUTHORIZED).json();
            }
        });
    });

authRouter.define()
    .path("/signup")
    .post(async function (req, res) {
        await userService.createUser(req.body.username, req.body.password).then(user => {
            if (user !== null) {
                const payload = {
                    user: user.username
                };
                let token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: 86400  // expires in 24 hours
                });
                res.status(HttpStatus.OK).json({token});
            } else {
                res.status(HttpStatus.UNAUTHORIZED).json();
            }
        });
    });

module.exports = authRouter.getRouter();