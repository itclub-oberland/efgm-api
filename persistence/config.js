let User = require("./model/user.model").User;
let Person = require("./model/person.model").Person;
let Address = require("./model/address.model").Adress;
let Role = require("./model/role.model").Role;

let {sequelize, Sequelize} = require("./connection");

function initRoles() {
    return Role.findAll().then(roles => {
        if (!roles.length) {
            return Role.bulkCreate([
                {name: "ROLE_USER"},
                {name: "ROLE_ADMIN"},
                {name: "ROLE_GM"},
                {name: "ROLE_LV"}
            ]).then(() => {
                return Role.findAll();
            }).then(roles => roles);
        } else {
            return roles;
        }
    });
}

module.exports = {
    init() {
        //Define relationships between data models
        User.Person = User.hasOne(Person);
        Role.belongsToMany(User, {through: "UserRole"});
        User.Roles = User.belongsToMany(Role, {through: "UserRole"});
        Person.Addressses = Person.hasMany(Address);

        // create all the defined tables in the specified database
        sequelize.sync()
            .then(() => {
                initRoles().then(() => {
                    console.log('Tables have been successfully created, if one doesn\'t exist');
                });
            }).catch(error => console.log('This error occured', error));
    },
    models: {
        User,
        Person,
        Address,
        Role
    },
    operators:
        {
            Op: Sequelize.Op
        }
};