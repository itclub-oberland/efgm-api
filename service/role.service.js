const persistenceConfig = require("../persistence/config");
const {Role} = persistenceConfig.models;
const Op = persistenceConfig.operators.Op;

async function findRoleByName(roleName) {
    return Role.findOne({where: {name: {[Op.eq]: roleName}}}).then(role => {
        return role;
    }).catch((err) => {
        console.log("Uh oh:", err);
        return null;
    });
}

async function all() {
    return Role.findAll().then(roles => roles);
}

module.exports = {
    findRoleByName,
    all
};