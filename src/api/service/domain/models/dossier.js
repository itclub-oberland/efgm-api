'use strict';
module.exports = (sequelize, DataTypes) => {
    const dossier = sequelize.define('dossier', {
        name: DataTypes.STRING
    }, {});
    dossier.associate = function(models) {
        dossier.Persons = dossier.belongsToMany(models.person, {through: "person_dossier"});
    };
    return dossier;
};