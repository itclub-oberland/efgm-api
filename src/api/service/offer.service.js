const persistenceConfig = require("./domain/config");
const {Offer} = persistenceConfig.models;
const Op = persistenceConfig.operators.Op;

async function createOffer(firstname, lastname, email, birthdate, gender) {
    return await Offer.create({
        firstname,
        lastname,
        email,
        birthdate,
        gender
    });
}

async function updatePersonById(personId, updatedPerson) {
    let retrievedPerson = await Offer.findOne(
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
    return await Offer.findOne({
        where:
            {
                id:
                    {[Op.eq]: personId}
            }
    });
}

async function removePersonById(personId) {
    return Boolean(await Offer.destroy({
        where: {
            id: {
                [Op.eq]: personId
            }
        }
    }));
}

async function findAll() {
    return await Offer.findAll();
}

module.exports = {
    createPerson: createOffer,
    updatePersonById,
    getPersonById,
    removePersonById,
    findAll
};