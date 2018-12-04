const {Sequelize, sequelize, Op} = require("../connection");

const Person = sequelize.define('person', {
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    birthdate: {
        type: Sequelize.DATE
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = {
    Person,
    Op
};