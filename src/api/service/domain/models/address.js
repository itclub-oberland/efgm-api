'use strict';
module.exports = (sequelize, DataTypes) => {
    const address = sequelize.define('address', {
        type: DataTypes.ENUM("HOME", "BILL", "BUSINESS", "SHIPPING", "ACTIVITY"),
        street: DataTypes.STRING,
        zip: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        country: DataTypes.STRING
    }, {});
    address.associate = function(models) {
        // associations can be defined here
    };

    // Ensure certain values are never returned to end user
    address.prototype.toJSON = function () {
        let values = Object.assign({}, this.get());
        delete values.createdAt;
        delete values.updatedAt;
        return values;
    };

    return address;
};