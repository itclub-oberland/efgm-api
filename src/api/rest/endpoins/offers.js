const AUTH_ROUTER = require("../auth/authrouter")(require("express").Router());
const LOGGER = require("../../util/logger");
const HTTP_STATUS = require('http-status-codes');
const {wrapInFallbackResponse} = require("../util/router.helper");

const OFFER_SERVICE = require("../../service/person.service");

AUTH_ROUTER.define()
    .path("/offers")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        await wrapInFallbackResponse(req, res, async () => {
            let offers = await OFFER_SERVICE.findAll();
            if (offers) {
                return res.status(HTTP_STATUS.OK).json(offers);
            }
            throw {message: "Offers couldn't be retrieved!"};
        });
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .post(async function (req, res) {
        await wrapInFallbackResponse(req, res, async () => {
            let {firstname, lastname, email, birthdate, gender} = req.body;
            let person = await OFFER_SERVICE.createPerson(firstname, lastname, email, birthdate, gender);
            if (person) {
                LOGGER.info("Offer created:", person);
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
            let person = await OFFER_SERVICE.getPersonById(req.params.id);
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
            let operationStatus = Boolean(await OFFER_SERVICE.removePersonById(req.params.id));
            if (operationStatus) {
                LOGGER.info(`Person with id ${req.params.id} deleted.`);
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
            let updatedPerson = await OFFER_SERVICE.updatePersonById(req.params.id, personObj);
            if (updatedPerson) {
                LOGGER.info("Person updated:", updatedPerson);
                return res.status(HTTP_STATUS.NO_CONTENT).json();
            } else {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Couldn't update Person!"});
            }
        });
    });

module.exports = AUTH_ROUTER.getRouter();
