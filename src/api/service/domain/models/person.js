'use strict';
module.exports = (sequelize, DataTypes) => {
    const person = sequelize.define('person', {
        email: DataTypes.STRING,
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        birthdate: DataTypes.DATE,
        gender: DataTypes.ENUM("FEMALE", "MALE", "OTHER")
    }, {});
    person.associate = function (models) {
        person.Addressses = person.belongsToMany(models.address, {through: "person_address"});
        person.Regions = person.belongsToMany(models.region, {through: "person_region"});
        person.Dossiers = person.belongsToMany(models.dossier, {through: "person_dossier"});
        person.Skills = person.hasMany(models.skill);
        person.Relations = person.belongsToMany(models.relation, {through: "person_relation"});
        person.Offers = person.belongsToMany(models.offer, {through: "person_offer"});
        person.Demands = person.belongsToMany(models.demand, {through: "person_demand"});
        person.Activities = person.belongsToMany(models.activity, {through: "activity_person"});
    };
    return person;
};