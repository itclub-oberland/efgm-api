const persistenceConfig = require("./domain/config");
const {User} = persistenceConfig.models;
const Op = persistenceConfig.operators.Op;

const roleService = require("./role.service");

async function getUserByUsername(username) {
    return await User.findOne({where: {username: {[Op.eq]: username}}});
}

async function createUser(userDto) {
    let {username, password} = userDto;
    let newUser = await User.create({
        username,
        password
    });
    if (newUser) {
        let role = await roleService.findRoleByName("ROLE_USER");
        await newUser.setRoles([role]);
    }
    return newUser;
}

async function getUserById(userId) {
    return await User.findOne({
        where:
            {
                id:
                    {[Op.eq]: userId}
            }
    });
}

async function updateUserById(userId, updatedUser) {
    let user = await User.findOne(
        {
            where:
                {
                    id:
                        {[Op.eq]: userId}
                }
        });
    if (user) {
        let updatedUser = await user.update({
            username: updatedUser.username,
            password: updatedUser.password,
            role: updatedUser.role
        }, {fields: ['username', 'password', 'role']});
        return updatedUser.dataValues;
    }
    return user;
}

async function removeUserById(userId) {
    return Boolean(await User.destroy({
        where: {
            id: {
                [Op.eq]: userId
            }
        }
    }));
}

async function findAll() {
    return await User.findAll();
}

module.exports = {
    createUser,
    findAll,
    getUserByUsername,
    getUserById,
    removeUserById,
    updateUserById
};