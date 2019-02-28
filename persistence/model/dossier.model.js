const {Sequelize, sequelize} = require("../connection");

const Dossier = sequelize.define('dossier', {
    name: {
        type: Sequelize.STRING
    },
});

module.exports = {
    Dossier
};