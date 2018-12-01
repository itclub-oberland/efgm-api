const Sequelize = require("sequelize");
// TODO: take sqlite name from env or other, singular place
const sequelize = new Sequelize('sqlite:./efgm.db');
const Op = Sequelize.Op;

const userModel = require("./user.model");

const PersonModel = sequelize.define('person', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    firstname: {
        type: Sequelize.STRING
    },
    lastname: {
        type: Sequelize.STRING
    },
    birthdate: {
        type: Sequelize.DATE
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

PersonModel.belongsTo(userModel.User, {foreignKey: "fk_user"});

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('person table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = {
    Person: PersonModel,
    Op
};