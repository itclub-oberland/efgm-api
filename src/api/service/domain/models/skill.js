'use strict';
module.exports = (sequelize, DataTypes) => {
    const skill = sequelize.define('skill', {
        type: DataTypes.ENUM("LANGUAGE", "PROFESSION", "HOBBY", "OTHER"),
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        level: DataTypes.STRING
    }, {});
    skill.associate = function(models) {
        // associations can be defined here
    };
    return skill;
};