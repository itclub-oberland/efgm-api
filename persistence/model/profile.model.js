const {Sequelize, sequelize} = require("../connection");

const Profile = sequelize.define('profile', {
    profession: {
        type: Sequelize.STRING
    }
});

module.exports = {
    Profile
};