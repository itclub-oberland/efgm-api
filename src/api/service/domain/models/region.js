'use strict';
module.exports = (sequelize, DataTypes) => {
    const region = sequelize.define('region', {
        name: DataTypes.STRING
    }, {});
    region.associate = function(models) {
        region.Persons = region.belongsToMany(models.person, {through: "person_region"});
    };
    return region;
};