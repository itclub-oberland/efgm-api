const LOGGER = require("@api/util/logger");
const HTTP_STATUS = require('http-status-codes/index');
const USER_SERVICE = require("@service/user.service");

async function getAll(req, res, next) {
    let users = await USER_SERVICE.findAll();
    if (users) {
        return res.status(HTTP_STATUS.OK).json(users);
    }
    throw {message: "Users couldn't be retrieved!"};
}

async function create(req, res, next) {
    let userDto = {username, password} = req.body;
    let user = await USER_SERVICE.createUser(userDto);
    if (user) {
        LOGGER.info("User created:", user);
        return res.status(HTTP_STATUS.OK).json(user);
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json();
    }
}

async function getOne(req, res, next) {
    let user = await USER_SERVICE.getUserById(req.params.userId);
    if (user) {
        return res.status(HTTP_STATUS.OK).json(user);
    } else {
        return res.status(HTTP_STATUS.NOT_FOUND).json({message: "User not found"})
    }
}

async function update(req, res, next) {
    let userDto = {username, password} = req.body;
    let updatedPerson = await USER_SERVICE.updateUserById(req.params.userId, userDto);
    if (updatedPerson) {
        LOGGER.info("User updated:", updatedPerson);
        return res.status(HTTP_STATUS.NO_CONTENT).json();
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Couldn't update User!"});
    }
}

async function remove(req, res, next) {
    let operationStatus = Boolean(await USER_SERVICE.removeUserById(req.params.userId));
    if (operationStatus) {
        LOGGER.info("User deleted:", `User ID ${req.params.userId}.`);
        return res.status(HTTP_STATUS.OK).json();
    } else {
        return res.status(HTTP_STATUS.NOT_FOUND).json();
    }
}

async function getProfile(req, res, next) {

}

async function updateProfile(req, res, next) {

}

module.exports = {
    getAll,
    create,
    getOne,
    update,
    remove
};
