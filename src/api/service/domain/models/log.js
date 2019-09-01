'use strict';
module.exports = (sequelize, DataTypes) => {
    const log = sequelize.define('log', {
        type: DataTypes.ENUM("CREATED", "UPDATED", "LOGGEDIN"),
        description: DataTypes.STRING,
        date: DataTypes.DATE
    }, {
        hooks: {
            beforeCreate: function (log) {
                if (!log.date) {
                    log.date = Date.now();
                }
            }
        }
    });
    log.associate = function(models) {
        log.User = log.belongsTo(models.user);
    };
    return log;
};
