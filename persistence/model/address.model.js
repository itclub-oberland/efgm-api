const {Sequelize, sequelize} = require("../connection");

const Adress = sequelize.define('address', {
    city: {
        type: Sequelize.STRING
    }
    ,
    street: {
        type: Sequelize.STRING
    },
    plz: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = {
    Adress
};