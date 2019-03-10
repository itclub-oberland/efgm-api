const persistenceConfig = require("./domain/config");
const {Role} = persistenceConfig.models;
const Op = persistenceConfig.operators.Op;

async function findRoleByName(roleName) {
    return await Role.findOne({where: {name: {[Op.eq]: roleName}}});
}

async function findAll() {
    return await Role.findAll();
}

module.exports = {
    findRoleByName,
    findAll
};