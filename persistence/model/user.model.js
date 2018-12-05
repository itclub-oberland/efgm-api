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

// Ensure certain values are never returned to end user
User.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());

    delete values.password;
    delete values.id;
    delete values.createdAt;
    delete values.updatedAt;
    return values;
};

module.exports = {
    User
};