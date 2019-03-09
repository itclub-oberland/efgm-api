const {Sequelize, sequelize} = require("../connection");

const Offer = sequelize.define('offer', {
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
    validUntil: {
        type: Sequelize.DATE
    }
});

module.exports = {
    Offer
};