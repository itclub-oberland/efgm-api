const authRouter = require("../auth/authrouter")(require("express").Router());
const jwt = require("jsonwebtoken");

const userService = require("../service/user.service");

authRouter.define()
    .path("/login")
    .post(async function (req, res) {
        await userService.findUser(req.body.username, req.body.password).then(user => {
            if (user !== null) {
                const payload = {
                    user: user.username
                };
                let token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: 86400  // expires in 24 hours
                });

                res.status(200).json({token});
            } else {
                res.status(401).json();
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
                res.status(200).json({token});
            } else {
                res.status(401).json();
            }
        });
    });

module.exports = authRouter.getRouter();