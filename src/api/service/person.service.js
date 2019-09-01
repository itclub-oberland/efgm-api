const db = require("./domain/db");
const Person = db.person;
const Op = db.Sequelize.Op;

async function createPerson(personDto) {
    return await Person.create({
        firstname: personDto.firstname,
        lastname: personDto.lastname,
        email: personDto.email,
        birthdate: personDto.birthdate,
        gender: personDto.gender
    });
}

async function updatePersonById(personId, updatedPerson) {
    let person = await Person.findOne(
        {
            where:
                {
                    id:
                        {[Op.eq]: personId}
                }
        });
    if (person) {
        let updatedPerson = await person.update({
            firstname: updatedPerson.firstname,
            lastname: updatedPerson.lastname,
            email: updatedPerson.email,
            birthdate: updatedPerson.birthdate,
            gender: updatedPerson.gender
        });
        return updatedPerson.dataValues
    }
    return person;
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
