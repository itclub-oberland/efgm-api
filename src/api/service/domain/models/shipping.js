'use strict';
module.exports = (sequelize, DataTypes) => {
    const shipping = sequelize.define('shipping', {
        type: DataTypes.ENUM("A_POST","B_POST", "CARGO", "COLLECT", "MEET", "OTHER"),
        description: DataTypes.STRING,
        deadline: DataTypes.DATE
    }, {});
    shipping.associate = function(models) {
        // associations can be defined here
    };
    return shipping;
};