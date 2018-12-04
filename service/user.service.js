const persistenceConfig = require("../persistence/config");
const {User, Person} = persistenceConfig.models;
const Op = persistenceConfig.operators.Op;

async function getUserByUsername(username) {
    return User.findOne({where: {username: {[Op.eq]: username}}}).then(user => {
        return user;
    }).catch((err) => {
        console.log("Uh oh:", err);
        return null;
    });
}

async function findUserByUsernameAndPassword(username, password) {
    return User.findOne({
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
    return User.create({
        username,
        password,
        role: "ROLE_USER",
        person: {
            firstname: "Hans",
            lastname: "Muster",
            birthdate: Date.now(),
            addresses: [{}]
        }
    }, {
        include: [
            {
                association: User.Person,
                include: [
                    {
                        association: Person.Addressses
                    }
                ]
            }]
    }).then((user) => {
        return user;
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

async function all() {
    return User.findAll().then(users => {
        return users;
    });
}

module.exports = {
    findUser: findUserByUsernameAndPassword,
    createUser,
    all,
    getUser: getUserByUsername,
    removeUserById: removeUserById,
    updateUserById: updateUserById
};