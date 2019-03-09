let authRouter = require("../auth/authrouter")(require("express").Router());
const logger = require("../../util/logger");
let personService = require("../../service/person.service");
let HttpStatus = require('http-status-codes');

authRouter.define()
    .path("/persons")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        await personService.findAll()
            .then(persons => {
                return res.status(HttpStatus.OK).json(persons);
            })
            .catch((err) => {
                console.log("Uh oh: ", err.message);
            });
    })
    .and()
    .post(async function (req, res) {
        let {firstname, lastname, email, birthdate, gender} = req.body;
        personService.createPerson(firstname, lastname, email, birthdate, gender)
            .then((newPerson) => {
                if (newPerson !== null) {
                    return res.status(HttpStatus.OK).json(newPerson);
                }else{
                    return res.status(HttpStatus.BAD_REQUEST);
                }
            });
    });

authRouter.define()
    .path("/persons/:id")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        await personService.getPersonById(req.params.id).then((person) => {
            if (person) {
                res.status(HttpStatus.OK).json(person);
            } else {
                res.status(HttpStatus.NOT_FOUND).json({message: "Person not found"})
            }
        });
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .delete(async function (req, res) {
        await personService.removePersonById(req.params.id)
            .then(operationStatus => {
                if (operationStatus) {
                    return res.status(HttpStatus.OK).json();
                } else {
                    return res.status(HttpStatus.NOT_FOUND).json();
                }
            }).catch((err) => {
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Couldn't delete Person! An error occurred."});
            });
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .put(async function (req, res) {
        let personObj = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            birthdate: req.body.birthdate,
            gender: req.body.gender
        };
        await personService.updatePersonById(req.params.id, personObj)
            .then((updatedPerson) => {
                return res.status(HttpStatus.OK).json(updatedPerson);
            })
            .catch((err) => {
                logger.error("Updating person failed:", err);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "Couldn't update person! An error occured."});
            });
    });


module.exports = authRouter.getRouter();
