'use strict';
module.exports = (sequelize, DataTypes) => {
    const condition = sequelize.define('condition', {
        type: DataTypes.ENUM("FREE", "BORROW", "EXCHANGE", "HIRE", "PAY", "OTHER"),
        validUntil: DataTypes.DATE
    }, {});
    condition.associate = function (models) {
        condition.Price = condition.belongsToMany(models.money, {through: "condition_money"});
    };
    return condition;
};