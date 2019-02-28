const {Sequelize, sequelize} = require("../connection");

const Shipping = sequelize.define('shipping', {
    type: {
        type: Sequelize.ENUM,
        values: ["A_POST","B_POST", "CARGO", "COLLECT", "MEET", "OTHER"]
    },
    description: {
        type: Sequelize.STRING
    },
    deadline:{
        type: Sequelize.DATE
    }
});

module.exports = {
    Shipping
};