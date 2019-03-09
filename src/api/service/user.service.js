const persistenceConfig = require("./domain/config");
const {User, Person} = persistenceConfig.models;
const Op = persistenceConfig.operators.Op;

const roleService = require("./role.service");

async function getUserByUsername(username) {
    return User.findOne({where: {username: {[Op.eq]: username}}}).then(user => {
        return user;
    }).catch((err) => {
        console.log("Uh oh:", err);
        return null;
    });
}

async function createUser(username, password) {
    let newUser = null;
    return User.create({
        username,
        password
    }).then((user) => {
        newUser = user;
        return roleService.findRoleByName("ROLE_USER");
    }).then((role) => {
        return newUser.setRoles([role]);
    }).then(() => {
        return newUser;
    }).catch((ex) => {
        console.log("Uh oh:", ex);
        return null;
    });
}

async function getUserById(userId) {
    return User.findOne({
        where:
            {
                id:
                    {[Op.eq]: userId}
            }
    }).then((user) => {
        return user;
    }).catch((ex) => {
            console.log("Uh oh: ", ex);
            return null;
        }
    );
}

async function updateUserById(userId, updatedUser) {
    return User.findOne(
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
        }, {fields: ['username', 'password', 'role']}).then((updatedUser) => {
            return updatedUser.dataValues;
        })
    }).catch((err) => {
        console.log("Uh oh:", err);
        return null;
    });
}

async function removeUserById(userId) {
    return User.destroy({
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

async function all() {
    return User.findAll().then(users => {
        return users;
    });
}

module.exports = {
    createUser,
    all,
    getUserByUsername,
    getUserById,
    removeUserById,
    updateUserById
};