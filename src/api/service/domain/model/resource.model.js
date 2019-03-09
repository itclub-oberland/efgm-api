const {Sequelize, sequelize} = require("../connection");

const Resource = sequelize.define('resource', {
    uri: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.ENUM,
        values: ["VIDEO", "PICTURE", "PDF", "OTHER"]
    }
});

module.exports = {
    Resource
};