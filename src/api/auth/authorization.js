function authorizeWithRole(roles) {
    return function (req, res, next) {
        if (!req.user || roles.length === 0 || !roles.includes(req.user.dataValues.role)){
            res.status(403).send("forbidden");
        }else{
            next();
        }
    }
}

module.exports = authorizeWithRole;