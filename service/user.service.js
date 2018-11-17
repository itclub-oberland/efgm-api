const UserModel = require("../model/user.model");
const UserService = UserModel.User;
const Op = UserModel.Op;

async function getUser(username) {
    return UserService.findOne({where: {username: {[Op.eq]: username}}}).then(user => {
        return user;
    }).catch((err) => {
        console.log("Uh oh:", err);
        return null;
    });
}

async function findUser(username, password) {
    return UserService.findOne({where: {username: {[Op.eq]: username}}}).then(user => {
        if (user && user.dataValues.password === password) {
            return user.dataValues;
        }
        throw {message: "UserService not found!"};
    }).catch((err) => {
        console.log("Uh oh:", err);
        return null;
    });
}

async function createUser(username, password) {
    return UserService.create({username, password, role: "ROLE_USER"}).then(user => {
        return user;
    }).catch((err) => {
        console.log("Uh oh:", err);
        return null;
    });
}

async function all() {
    return UserService.findAll().then(users => {
        return users;
    });
}

module.exports = {findUser, createUser, all, getUser};