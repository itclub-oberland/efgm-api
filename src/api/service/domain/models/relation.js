'use strict';
module.exports = (sequelize, DataTypes) => {
    const relation = sequelize.define('relation', {
        type: DataTypes.ENUM("WIFE","HUSBAND","DAUGHTER","SON","BROTHER","SISTER","FATHER","MOTHER"),
        since: DataTypes.DATE,
        name: DataTypes.STRING
    }, {});
    relation.associate = function(models) {
        relation.Person = relation.belongsTo(models.person);
    };
    return relation;
};