const Sequelize = require("sequelize");
const sequelize = new Sequelize('sqlite:./src/resource/efgm.db', {
    logging: false
});
module.exports = {
    Sequelize,
    sequelize
};