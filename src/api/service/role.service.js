const db = require("./domain/db");
const Role = db.role;
const Op = db.Sequelize.Op;

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