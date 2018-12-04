const {Sequelize, sequelize, Op} = require("../connection");

const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    /**
     * TODO: Needs to be roles, array
     * TOD: Adjust routes/services as well
     * */
    role: {
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
    User,
    Op
};