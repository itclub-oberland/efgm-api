const LOGGER = require("@api/util/logger");
const HTTP_STATUS = require('http-status-codes/index');
const PERSON_SERVICE = require("@service/person.service");

async function getAll(req, res, next) {
    let persons = await PERSON_SERVICE.findAll();
    if (persons) {
        return res.status(HTTP_STATUS.OK).json(persons);
    }
    throw {message: "Persons couldn't be retrieved!"};
}

async function create(req, res, next) {
    let personDto = {firstname, lastname, email, birthdate, gender} = req.body;
    let person = await PERSON_SERVICE.createPerson(personDto);
    if (person) {
        LOGGER.info("Person created:", person);
        return res.status(HTTP_STATUS.OK).json(person);
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json();
    }
}

async function getOne(req, res, next) {
    let person = await PERSON_SERVICE.getPersonById(req.params.personId);
    if (person) {
        return res.status(HTTP_STATUS.OK).json(person);
    } else {
        return res.status(HTTP_STATUS.NOT_FOUND).json({message: "Person not found"})
    }
}

async function update(req, res, next) {
    let personObj = {firstname, lastname, email, birthdate, gender} = req.body;
    let updatedPerson = await PERSON_SERVICE.updatePersonById(req.params.personId, personObj);
    if (updatedPerson) {
        LOGGER.info("Person updated:", updatedPerson);
        return res.status(HTTP_STATUS.NO_CONTENT).json();
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Couldn't update Person!"});
    }
}

async function remove(req, res, next) {
    let operationStatus = Boolean(await PERSON_SERVICE.removePersonById(req.params.id));
    if (operationStatus) {
        LOGGER.info(`Person with id ${req.params.personId} deleted.`);
        return res.status(HTTP_STATUS.OK).json();
    } else {
        return res.status(HTTP_STATUS.NOT_FOUND).json();
    }
}

module.exports = {
    getAll,
    create,
    getOne,
    update,
    remove
};
