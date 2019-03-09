const {Sequelize, sequelize} = require("../connection");

const Adress = sequelize.define('address', {
    type: {
        type: Sequelize.ENUM,
        values: ["HOME", "BILL", "BUSINESS", "SHIPPING", "ACTIVITY"]
    },
    street: {
        type: Sequelize.STRING
    },
    zip: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    }
});


// Ensure certain values are never returned to end user
Adress.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    delete values.createdAt;
    delete values.updatedAt;
    return values;
};

module.exports = {
    Adress
};