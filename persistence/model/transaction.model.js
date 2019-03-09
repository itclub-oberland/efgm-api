const {Sequelize, sequelize} = require("../connection");

const Transaction = sequelize.define('transaction', {
    state: {
        type: Sequelize.ENUM,
        values: ["OPENED", "IN-PROGRESS", "PROCESSED"]
    }
});

module.exports = {
    Transaction
};