function authorizeWithRole(roles) {

    function containsRoute(userRoles) {
        return roles.every(role => userRoles.includes(role));
    }

    return function (req, res, next) {
        if (!req.user || roles.length === 0) {
            res.status(403).send("forbidden");
        } else {
            req.user.getRoles().then((userRoles) => {
                let simplifiedUserRoles = userRoles.map(role => role.name);
                if (containsRoute(simplifiedUserRoles)) {
                    next();
                } else {
                    res.status(403).send("forbidden");
                }
            });
        }
    }
}

module.exports = authorizeWithRole;
