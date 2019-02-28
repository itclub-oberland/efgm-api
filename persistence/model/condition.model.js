const {Sequelize, sequelize} = require("../connection");

const Condition = sequelize.define('condition', {
    type: {
        type: Sequelize.ENUM,
        values: ["FREE","BORROW", "EXCHANGE", "HIRE", "PAY", "OTHER"]
    },
    validUntil:{
        type: Sequelize.DATE
    }
});

module.exports = {
    Condition
};