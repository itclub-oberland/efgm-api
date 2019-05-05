'use strict';
module.exports = (sequelize, DataTypes) => {
    const demand = sequelize.define('demand', {
        type: DataTypes.ENUM("IMMOBILIEN", "SPIELZEUG", "KLEIDER", "ELEKTRONIK"),
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        fromDate: DataTypes.DATE,
        toDate: DataTypes.DATE
    }, {});
    demand.associate = function(models) {
        demand.Resources = demand.belongsToMany(models.resource, {through: "demand_resource"});
        demand.Condition = demand.belongsToMany(models.condition, {through: "demand_condition"});
    };
    return demand;
};