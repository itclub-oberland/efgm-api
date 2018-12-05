const {Sequelize, sequelize} = require("../connection");

const Role = sequelize.define('role', {
    name: {
        type: Sequelize.STRING
    }
});

module.exports = {
    Role
};