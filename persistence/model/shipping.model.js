const {Sequelize, sequelize} = require("../connection");

const Shipping = sequelize.define('shipping', {
    type: {
        type: Sequelize.ENUM,
        values: ["Abholung", "Postversand"]
    },
    description: {
        type: Sequelize.STRING
    }
});

module.exports = {
    Shipping
};