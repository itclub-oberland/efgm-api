'use strict';
module.exports = (sequelize, DataTypes) => {
    const money = sequelize.define('money', {
        value: DataTypes.STRING,
        currency: DataTypes.STRING
    }, {});
    money.associate = function(models) {
        // associations can be defined here
    };
    return money;
};