'use strict';
module.exports = (sequelize, DataTypes) => {
    const activity = sequelize.define('activity', {
        type: DataTypes.ENUM("PICKNICK","MOVIE","TEA","VISIT","TRAVEL","OTHER"),
        date: DataTypes.DATE,
        duration: DataTypes.INTEGER,
        description: DataTypes.STRING
    }, {});
    activity.associate = function(models) {
        activity.Persons = activity.belongsToMany(models.person, {through: "activity_person"});
        activity.Location = activity.belongsToMany(models.address, {through: "activity_location"});
        activity.Budget = activity.belongsToMany(models.money, {through: "activity_money"});
    };
    return activity;
};