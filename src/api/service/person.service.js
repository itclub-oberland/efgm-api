const persistenceConfig = require("./domain/config");
const {User, Person} = persistenceConfig.models;
const Op = persistenceConfig.operators.Op;

async function createPerson(firstname, lastname, email, birthdate, gender) {
    Person.create({
        firstname,
        lastname,
        email,
        birthdate,
        gender
    }).then((newPerson) => {
        return newPerson;
    });
}

async function updatePersonById(personId, updatedPerson) {
    Person.findOne(
        {
            where:
                {
                    id:
                        {[Op.eq]: personId}
                }
        }).then((retrievedPerson) => {
        return retrievedPerson.update({
            firstname: updatedPerson.firstname,
            lastname: updatedPerson.lastname,
            email: updatedPerson.email,
            birthdate: updatedPerson.birthdate,
            gender: updatedPerson.gender
        });
    }).then((updatedPerson) => {
        console.log(updatedPerson);
        return updatedPerson;
    });
}

async function getPersonById(personId) {
    return Person.findOne({
        where:
            {
                id:
                    {[Op.eq]: personId}
            }
    }).then((person) => {
        return person;
    }).catch((ex) => {
            console.log("Uh oh: ", ex);
            return null;
        }
    );
}

async function removePersonById(personId) {
    return Person.destroy({
        where: {
            id: {
                [Op.eq]: personId
            }
        }
    }).then((operationCode) => {
        return Boolean(operationCode);
    }).catch((err) => {
        console.log("Uh oh:", err);
        return null;
    });
}

async function findAll() {
    return Person.findAll().then(persons => {
        return persons;
    });
}

module.exports = {
    createPerson,
    updatePersonById,
    getPersonById,
    removePersonById,
    findAll
};