let User = require("./model/user.model").User;
let Person = require("./model/person.model").Person;
let Address = require("./model/address.model").Adress;
let {sequelize, Op} = require("./connection");

module.exports = {
    init() {
        //Defien relationships between data models
        User.Person = User.hasOne(Person);
        Person.Addressses = Person.hasMany(Address);

        // create all the defined tables in the specified database
        sequelize.sync()
            .then(() => console.log('Tables have been successfully created, if one doesn\'t exist'))
            .catch(error => console.log('This error occured', error));
    },
    models: {
        User,
        Person,
        Address
    },
    operators:
        {
            Op
        }
};