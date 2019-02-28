const {Sequelize, sequelize} = require("../connection");

const Person = sequelize.define('person', {
    email: {
        type: Sequelize.STRING
    },
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    birthdate: {
        type: Sequelize.DATE
    },
    gender: {
        type: Sequelize.ENUM,
        values: ["FEMALE", "MALE", "OTHER"]
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