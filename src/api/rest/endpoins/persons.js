const AUTH_ROUTER = require("../auth/authrouter")(require("express").Router());
const LOGGER = require("../../util/logger");
const HTTP_STATUS = require('http-status-codes');

const PERSON_SERVICE = require("../../service/person.service");

async function wrapInFallbackResponse(req, res, callback) {
    try {
        return await callback();
    } catch (ex) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Something went wrong! Sorry!"});
    }
}

AUTH_ROUTER.define()
    .path("/persons")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        await wrapInFallbackResponse(req, res, async () => {
            let persons = await PERSON_SERVICE.findAll();
            if (persons) {
                return res.status(HTTP_STATUS.OK).json(persons);
            }
            throw {message: "Something went wrong! Sorry!"};
        });
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .post(async function (req, res) {
        await wrapInFallbackResponse(req, res, async () => {
            let {firstname, lastname, email, birthdate, gender} = req.body;
            let person = await PERSON_SERVICE.createPerson(firstname, lastname, email, birthdate, gender);
            if (person) {
                return res.status(HTTP_STATUS.OK).json(person);
            } else {
                return res.status(HTTP_STATUS.BAD_REQUEST).json();
            }
        });
    });


AUTH_ROUTER.define()
    .path("/persons/:id")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        await wrapInFallbackResponse(req, res, async () => {
            let person = await PERSON_SERVICE.getPersonById(req.params.id);
            if (person) {
                return res.status(HTTP_STATUS.OK).json(person);
            } else {
                return res.status(HTTP_STATUS.NOT_FOUND).json({message: "Person not found"})
            }
        });
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .delete(async function (req, res) {
        await wrapInFallbackResponse(req, res, async () => {
            let operationStatus = Boolean(await PERSON_SERVICE.removePersonById(req.params.id));
            if (operationStatus) {
                return res.status(HTTP_STATUS.OK).json();
            } else {
                return res.status(HTTP_STATUS.NOT_FOUND).json();
            }
        });
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .put(async function (req, res) {
        await wrapInFallbackResponse(req, res, async () => {
            let personObj = {firstname, lastname, email, birthdate, gender} = req.body;
            let updatedPerson = await PERSON_SERVICE.updatePersonById(req.params.id, personObj);
            if (updatedPerson) {
                return res.status(HTTP_STATUS.NO_CONTENT).json();
            } else {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Couldn't update Person!"});
            }
        });
    });

module.exports = AUTH_ROUTER.getRouter();
