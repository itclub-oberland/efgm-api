const persistenceConfig = require("./domain/config");
const {Offer} = persistenceConfig.models;
const Op = persistenceConfig.operators.Op;

async function createOffer(offerDto) {
    let {type, title, description} = offerDto;
    return await Offer.create({
        type,
        title,
        description
    });
}

async function updateOfferById(offerId, updatedOffer) {
    let retrievedPerson = await Offer.findOne(
        {
            where:
                {
                    id:
                        {[Op.eq]: offerId}
                }
        });
    if (retrievedPerson) {
        return await retrievedPerson.update({
            type: updatedOffer.type,
            title: updatedOffer.title,
            description: updatedOffer.description
        });
    }
    return null;
}

async function getOfferById(offerId) {
    return await Offer.findOne({
        where:
            {
                id:
                    {[Op.eq]: offerId}
            }
    });
}

async function removeOfferById(offerId) {
    return Boolean(await Offer.destroy({
        where: {
            id: {
                [Op.eq]: offerId
            }
        }
    }));
}

async function findAll() {
    return await Offer.findAll();
}

module.exports = {
    createOffer,
    updateOfferById,
    getOfferById,
    removeOfferById,
    findAll
};