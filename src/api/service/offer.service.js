const db = require("./domain/db");
const Offer = db.offer;
const Op = db.Sequelize.Op;

async function createOffer(offerDto) {
    return await Offer.create({
        type: offerDto.type,
        title: offerDto.title,
        description: offerDto.description
    });
}

async function updateOfferById(offerId, offerDto) {
    let offer = await Offer.findOne(
        {
            where:
                {
                    id:
                        {[Op.eq]: offerId}
                }
        });
    if (offer) {
        let updatedOffer = await offer.update({
            type: offerDto.type,
            title: offerDto.title,
            description: offerDto.description
        });
        return updatedOffer.dataValues
    }
    return offer;
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
