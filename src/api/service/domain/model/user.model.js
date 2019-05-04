const bcrypt = require("bcrypt");
const {Sequelize, sequelize} = require("../connection");

async function encryptPassword(user) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
}

const User = sequelize.define('user', {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [3, 255],
                    msg: "Username needs to be longer than 3 characters."
                },
                notEmpty: {
                    msg: "Please enter a username"
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "You need to set a password!"
                }
            }
        },
        status: {
            type: Sequelize.ENUM,
            values: ["ACTIVE", "PASSIVE", "INITIAL"]
        },
        activeSince: {
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
    delete values.activeSince;
    return values;
};

module.exports = {
    User
};