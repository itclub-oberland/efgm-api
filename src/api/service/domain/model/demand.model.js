const {Sequelize, sequelize} = require("../connection");

const Demand = sequelize.define('demand', {
    type: {
        type: Sequelize.ENUM,
        values: ["IMMOBILIEN", "SPIELZEUG", "KLEIDER", "ELEKTRONIK"]
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    fromDate: {
        type: Sequelize.DATE
    },
    toDate: {
        type: Sequelize.DATE
    }
});

module.exports = {
    Demand
};