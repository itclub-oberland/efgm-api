const Sequelize = require("sequelize");
const sequelize = new Sequelize('sqlite:./efgm.db');
module.exports = {
    Sequelize,
    sequelize
};