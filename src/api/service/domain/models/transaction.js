'use strict';
module.exports = (sequelize, DataTypes) => {
    const transaction = sequelize.define('transaction', {
        state: DataTypes.ENUM("OPENED", "IN-PROGRESS", "PROCESSED")
    }, {});
    transaction.associate = function(models) {
        transaction.Seller = transaction.belongsTo(models.person, {as: "seller"});
        transaction.Buyer = transaction.belongsTo(models.person, {as: "buyer"});
        transaction.Offer = transaction.belongsTo(models.offer);
        transaction.Demand = transaction.belongsTo(models.demand);
    };
    return transaction;
};