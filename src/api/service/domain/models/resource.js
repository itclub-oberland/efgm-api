'use strict';
module.exports = (sequelize, DataTypes) => {
    const resource = sequelize.define('resource', {
        uri: DataTypes.STRING,
        name: DataTypes.STRING,
        type: DataTypes.ENUM("VIDEO", "PICTURE", "PDF", "OTHER")
    }, {});
    resource.associate = function(models) {
        // associations can be defined here
    };
    return resource;
};