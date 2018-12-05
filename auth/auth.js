const passport = require('passport');
const userService = require("../service/user.service");
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    let user = await userService.getUserByUsername(jwt_payload.user);
    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
}));

function authenticate(req, res, next) {
    return passport.authenticate("jwt", {session: false})(req, res, next);
}

module.exports = authenticate;