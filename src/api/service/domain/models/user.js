'use strict';
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    async function encryptPassword(user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }

    const user = sequelize.define('user', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        status: DataTypes.ENUM("ACTIVE", "PASSIVE", "INITIAL"),
        activeSince: DataTypes.DATE
    }, {
        hooks: {
            beforeCreate: encryptPassword,
            beforeUpdate: encryptPassword
        }
    });
    user.associate = function (models) {
        user.Person = user.hasOne(models.person);
        user.Logs = user.hasMany(models.log);
        user.Roles = user.belongsToMany(models.role, {through: "user_role"});
    };

    user.prototype.validPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

// Ensure certain values are never returned to end user
    user.prototype.toJSON = function () {
        let values = Object.assign({}, this.get());

        delete values.password;
        delete values.id;
        delete values.createdAt;
        delete values.updatedAt;
        delete values.activeSince;
        return values;
    };

    return user;
};