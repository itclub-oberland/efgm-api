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