const Sequelize = require("sequelize");
const sequelize = new Sequelize('sqlite:./src/resource/efgm.db');
module.exports = {
    Sequelize,
    sequelize
};