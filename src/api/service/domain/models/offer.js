'use strict';
module.exports = (sequelize, DataTypes) => {
    const offer = sequelize.define('offer', {
        type: DataTypes.ENUM("IMMOBILIEN", "SPIELZEUG", "KLEIDER", "ELEKTRONIK"),
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        validUntil: DataTypes.DATE
    }, {});
    offer.associate = function (models) {
        offer.Resources = offer.belongsToMany(models.resource, {through: "offer_resource"});
        offer.Location = offer.belongsToMany(models.address, {through: "offer_location"});
        offer.Shipping = offer.belongsToMany(models.shipping, {through: 'offer_shipping'});
        offer.Condition = offer.belongsToMany(models.condition, {through: "offer_condition"});
    };
    return offer;
};