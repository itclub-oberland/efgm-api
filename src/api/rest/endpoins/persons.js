let authRouter = require("../auth/authrouter")(require("express").Router());
const logger = require("../../util/logger");
let personService = require("../../service/person.service");

authRouter.define()
    .path("/persons")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        await personService.findAll()
            .then(persons => {
                return res.status(200).json(persons);
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
                return res.status(200).json(newPerson);
            });
    });

authRouter.define()
    .path("/persons/:id")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        await personService.getPersonById(req.params.id).then((person) => {
            if (person) {
                res.status(200).json(person);
            } else {
                res.status(404).json({message: "Person not found"})
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
                    return res.status(200).json();
                } else {
                    return res.status(404).json();
                }
            }).catch((err) => {
                return res.status(500).json({message: "Couldn't delete Person! An error occurred."});
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
                return res.status(200).json(updatedPerson);
            })
            .catch((err) => {
                logger.error("Updating person failed:", err);
                return res.status(500).json({message: "Couldn't update person! An error occured."});
            });
    });


module.exports = authRouter.getRouter();
