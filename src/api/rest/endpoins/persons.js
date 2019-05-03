const AUTH_ROUTER = require("../auth/authrouter").build();
const LOGGER = require("../../util/logger");
const HTTP_STATUS = require('http-status-codes');
const PERSON_SERVICE = require("../../service/person.service");

AUTH_ROUTER.define()
    .path("/persons")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        let persons = await PERSON_SERVICE.findAll();
        if (persons) {
            return res.status(HTTP_STATUS.OK).json(persons);
        }
        throw {message: "Persons couldn't be retrieved!"};
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .post(async function (req, res) {
        let personDto = {firstname, lastname, email, birthdate, gender} = req.body;
        let person = await PERSON_SERVICE.createPerson(personDto);
        if (person) {
            LOGGER.info("Person created:", person);
            return res.status(HTTP_STATUS.OK).json(person);
        } else {
            return res.status(HTTP_STATUS.BAD_REQUEST).json();
        }
    });


AUTH_ROUTER.define()
    .path("/persons/:id")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        let person = await PERSON_SERVICE.getPersonById(req.params.id);
        if (person) {
            return res.status(HTTP_STATUS.OK).json(person);
        } else {
            return res.status(HTTP_STATUS.NOT_FOUND).json({message: "Person not found"})
        }
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .delete(async function (req, res) {
        let operationStatus = Boolean(await PERSON_SERVICE.removePersonById(req.params.id));
        if (operationStatus) {
            LOGGER.info(`Person with id ${req.params.id} deleted.`);
            return res.status(HTTP_STATUS.OK).json();
        } else {
            return res.status(HTTP_STATUS.NOT_FOUND).json();
        }
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .put(async function (req, res) {
        let personObj = {firstname, lastname, email, birthdate, gender} = req.body;
        let updatedPerson = await PERSON_SERVICE.updatePersonById(req.params.id, personObj);
        if (updatedPerson) {
            LOGGER.info("Person updated:", updatedPerson);
            return res.status(HTTP_STATUS.NO_CONTENT).json();
        } else {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Couldn't update Person!"});
        }
    });

module.exports = AUTH_ROUTER.getRouter();
