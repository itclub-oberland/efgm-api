const {Sequelize, sequelize} = require("../connection");

const Region = sequelize.define('region', {
    name: {
        type: Sequelize.STRING
    },
});

module.exports = {
    Region
};