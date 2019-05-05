const LOGGER = require("@api/util/logger");
const HTTP_STATUS = require('http-status-codes/index');
const OFFER_SERVICE = require("@service/offer.service");

async function getAll(req, res, next) {
    let offers = await OFFER_SERVICE.findAll();
    if (offers) {
        return res.status(HTTP_STATUS.OK).json(offers);
    }
    throw {message: "Offers couldn't be retrieved!"};
}

async function create(req, res, next) {
    let offerDto = {type, title, description} = req.body;
    let offer = await OFFER_SERVICE.createOffer(offerDto);
    if (offer) {
        LOGGER.info("Offer created:", offer);
        return res.status(HTTP_STATUS.OK).json(offer);
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json();
    }
}

async function getOne(req, res, next) {
    let offer = await OFFER_SERVICE.getOfferById(req.params.offerId);
    if (offer) {
        return res.status(HTTP_STATUS.OK).json(offer);
    } else {
        return res.status(HTTP_STATUS.NOT_FOUND).json({message: "Offer not found"})
    }
}

async function update(req, res, next) {
    let offerObj = {type, title, description} = req.body;
    let updatedOffer = await OFFER_SERVICE.updateOfferById(req.params.offerId, offerObj);
    if (updatedOffer) {
        LOGGER.info("Offer updated:", updatedOffer);
        return res.status(HTTP_STATUS.NO_CONTENT).json();
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Couldn't update Offer!"});
    }
}

async function remove(req, res, next) {
    let operationStatus = Boolean(await OFFER_SERVICE.removeOfferById(req.params.offerId));
    if (operationStatus) {
        LOGGER.info(`Offer with id ${req.params.offerId} deleted.`);
        return res.status(HTTP_STATUS.OK).json();
    } else {
        return res.status(HTTP_STATUS.NOT_FOUND).json();
    }
}

module.exports = {
    getAll,
    create,
    getOne,
    update,
    remove
};
