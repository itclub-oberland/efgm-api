const Sequelize = require("sequelize");
const sequelize = new Sequelize('sqlite:./efgm.db');
const Op = Sequelize.Op;

const personModel =require("./person.model");

const AddressModel = sequelize.define('address', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    city: {
        type: Sequelize.STRING
    }
    ,
    street: {
        type: Sequelize.STRING
    },
    plz: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});


AddressModel.belongsToMany(personModel.Person, {foreignKey:"fk_person"});

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('address table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = {
    Address: AddressModel,
    Op
};