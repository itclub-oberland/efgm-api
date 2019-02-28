const {Sequelize, sequelize} = require("../connection");

const Activity = sequelize.define('activity', {
    type: {
        type: Sequelize.ENUM,
        values: ["PICKNICK","MOVIE","TEA","VISIT","TRAVEL","OTHER"]
    },
    date:{
        type: Sequelize.DATE
    },
    duration:{
        type: Sequelize.INTEGER
    },
    description:{
        type: Sequelize.STRING
    }
});

module.exports = {
    Activity
};