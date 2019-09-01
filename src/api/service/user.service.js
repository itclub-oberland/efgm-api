const db = require("./domain/db");
const User = db.user;
const Op = db.Sequelize.Op;

const roleService = require("./role.service");

async function getUserByUsername(username) {
    return await User.findOne({
        where: {
            username: {
                [Op.eq]: username
            }
        }
    });
}

async function createUser(userDto) {
    let newUser = await User.create({
        username: userDto.username,
        password: userDto.password
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

async function updateUserById(userId, updateUser) {
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
            username: updateUser.username,
            password: updateUser.password,
            role: updateUser.role
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
