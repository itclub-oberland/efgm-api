const {Sequelize, sequelize} = require("../connection");

const Skill = sequelize.define('skill', {
    type: {
        type: Sequelize.ENUM,
        values: ["LANGUAGE", "PROFESSION", "HOBBY", "OTHER"]
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    level: {
        type: Sequelize.STRING
    }
});

module.exports = {
    Skill
};