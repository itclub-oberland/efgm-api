const persistenceConfig = require("./domain/config");
const {Person} = persistenceConfig.models;
const Op = persistenceConfig.operators.Op;

async function createPerson(firstname, lastname, email, birthdate, gender) {
    return await Person.create({
        firstname,
        lastname,
        email,
        birthdate,
        gender
    });
}

async function updatePersonById(personId, updatedPerson) {
    let retrievedPerson = await Person.findOne(
        {
            where:
                {
                    id:
                        {[Op.eq]: personId}
                }
        });
    if (retrievedPerson) {
        return await retrievedPerson.update({
            firstname: updatedPerson.firstname,
            lastname: updatedPerson.lastname,
            email: updatedPerson.email,
            birthdate: updatedPerson.birthdate,
            gender: updatedPerson.gender
        });
    }
    return null;
}

async function getPersonById(personId) {
    return await Person.findOne({
        where:
            {
                id:
                    {[Op.eq]: personId}
            }
    });
}

async function removePersonById(personId) {
    return Boolean(await Person.destroy({
        where: {
            id: {
                [Op.eq]: personId
            }
        }
    }));
}

async function findAll() {
    return await Person.findAll();
}

module.exports = {
    createPerson,
    updatePersonById,
    getPersonById,
    removePersonById,
    findAll
};