const bcrypt = require("bcrypt");
const {Sequelize, sequelize} = require("../connection");

async function encryptPassword(user) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
}

const User = sequelize.define('user', {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    },
    {
        hooks: {
            beforeCreate: encryptPassword,
            beforeUpdate: encryptPassword
        }
    });

User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = {
    User
};