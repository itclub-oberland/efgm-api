const {Sequelize, sequelize} = require("../connection");

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

// Ensure certain values are never returned to end user
Person.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());

    delete values.createdAt;
    delete values.updatedAt;
    return values;
};

module.exports = {
    Person
};