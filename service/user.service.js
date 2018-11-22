const userModelModule = require("../model/user.model");
const UserModel = userModelModule.User;
const Op = userModelModule.Op;

async function getUserByUsername(username) {
    return UserModel.findOne({where: {username: {[Op.eq]: username}}}).then(user => {
        return user;
    }).catch((err) => {
        console.log("Uh oh:", err);
        return null;
    });
}

async function findUserByUsernameAndPassword(username, password) {
    return UserModel.findOne({
        where: {
            username: {
                [Op.eq]: username
            }
        }
    }).then(user => {
        if (user && user.dataValues.password === password) {
            return user.dataValues;
        }
        throw {message: "User not found!"};
    }).catch((err) => {
        console.log("Uh oh:", err);
        return null;
    });
}

async function createUser(username, password) {
    return UserModel.create({username, password, role: "ROLE_USER"}).then(user => {
        return user;
    }).catch((err) => {
        console.log("Uh oh:", err);
        return null;
    });
}

async function removeUserById(userId) {
    return UserModel.destroy({
        where: {
            id: {
                [Op.eq]: userId
            }
        }
    }).then((operationCode) => {
        return Boolean(operationCode);
    }).catch((err) => {
        console.log("Uh oh:", err);
        return null;
    });
}

async function updateUserById(userId, updatedUser) {
    return UserModel.findOne(
        {
            where:
                {
                    id:
                        {[Op.eq]: userId}
                }
        }).then((user) => {
        return user.update({
            username: updatedUser.username,
            password: updatedUser.password,
            role: updatedUser.role
        }, {fields:['username','password','role']}).then((updatedUser) => {
            return updatedUser.dataValues;
        })
    }).catch((err) => {
        console.log("Uh oh:", err);
        return null;
    });
}

async function all() {
    return UserModel.findAll().then(users => {
        return users;
    });
}

module.exports = {
    findUser: findUserByUsernameAndPassword,
    createUser,
    all,
    getUser: getUserByUsername,
    removeUserById: removeUserById,
    updateUserById:updateUserById
};