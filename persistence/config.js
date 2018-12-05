let User = require("./model/user.model").User;
let Person = require("./model/person.model").Person;
let Address = require("./model/address.model").Adress;
let Role = require("./model/role.model").Role;
let Log = require("./model/log.model").Log;
let Skill = require("./model/skill.model").Skill;
let Profile = require("./model/profile.model").Profile;
let Resource = require("./model/resource.model").Resource;
let Offer = require("./model/offer.model").Offer;

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
        User.Logs = User.hasMany(Log, {as: "History"});
        User.Profile = User.hasOne(Profile);
        User.Roles = User.belongsToMany(Role, {through: "user_role"});
        User.Offers = User.belongsToMany(Offer, {through: "user_offer"});

        Offer.Resources = Resource.belongsToMany(Offer, {through: "offer_resource"});
        Offer.Location = Address.belongsToMany(Offer, {through: "offer_location"});

        Role.belongsToMany(User, {through: "user_role"});

        Person.Addressses = Person.belongsToMany(Address, {through: "person_address"});

        Profile.Skills = Profile.hasMany(Skill);
        Profile.Resources = Profile.belongsToMany(Resource, {through: "profile_resource"});

        Resource.belongsToMany(Profile, {through: "profile_resource"});

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
        Role,
        Log,
        Skill,
        Profile,
        Resource,
        Offer
    },
    operators:
        {
            Op: Sequelize.Op
        }
};