const {Sequelize, sequelize} = require("../connection");

const Log = sequelize.define('log', {
    type: {
        type: Sequelize.ENUM,
        values: ["CREATED", "UPDATED", "LOGGEDIN"]
    },
    description: {
        type: Sequelize.STRING
    },
    date: {
        type: Sequelize.DATE
    }
}, {
    hooks: {
        beforeCreate: function (log) {
            if (!log.date) {
                log.date = Date.now();
            }
        }
    }
});

module.exports = {
    Log
};