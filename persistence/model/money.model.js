const {Sequelize, sequelize} = require("../connection");

const Money = sequelize.define('money', {
    value: {
        type: Sequelize.STRING
    },
    currency:{
        type: Sequelize.STRING
    }
});

module.exports = {
    Money
};