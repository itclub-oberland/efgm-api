const Sequelize = require("sequelize");
const sequelize = new Sequelize('sqlite:./efgm.db');
const Op = Sequelize.Op;

const UserModel = sequelize.define('user', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
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

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = {
    User: UserModel,
    Op
};