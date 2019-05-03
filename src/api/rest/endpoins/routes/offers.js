const AUTH_ROUTER = require("../../auth/authrouter").build({mergeParams:true});
const LOGGER = require("../../../util/logger");
const HTTP_STATUS = require('http-status-codes/index');
const OFFER_SERVICE = require("../../../service/offer.service");

AUTH_ROUTER.define()
    .path("/")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        let offers = await OFFER_SERVICE.findAll();
        if (offers) {
            return res.status(HTTP_STATUS.OK).json(offers);
        }
        throw {message: "Offers couldn't be retrieved!"};
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .post(async function (req, res) {
        let offerDto = {type, title, description} = req.body;
        let offer = await OFFER_SERVICE.createOffer(offerDto);
        if (offer) {
            LOGGER.info("Offer created:", offer);
            return res.status(HTTP_STATUS.OK).json(offer);
        } else {
            return res.status(HTTP_STATUS.BAD_REQUEST).json();
        }
    });


AUTH_ROUTER.define()
    .path("/:offerId")
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .get(async function (req, res) {
        let offer = await OFFER_SERVICE.getOfferById(req.params.id);
        if (offer) {
            return res.status(HTTP_STATUS.OK).json(offer);
        } else {
            return res.status(HTTP_STATUS.NOT_FOUND).json({message: "Offer not found"})
        }
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .delete(async function (req, res) {
        let operationStatus = Boolean(await OFFER_SERVICE.removeOfferById(req.params.id));
        if (operationStatus) {
            LOGGER.info(`Offer with id ${req.params.id} deleted.`);
            return res.status(HTTP_STATUS.OK).json();
        } else {
            return res.status(HTTP_STATUS.NOT_FOUND).json();
        }
    })
    .and()
    // .needsAuthentication()
    // .withRoles(["ROLE_ADMIN"])
    .put(async function (req, res) {
        let offerObj = {type, title, description} = req.body;
        let updatedOffer = await OFFER_SERVICE.updateOfferById(req.params.id, offerObj);
        if (updatedOffer) {
            LOGGER.info("Offer updated:", updatedOffer);
            return res.status(HTTP_STATUS.NO_CONTENT).json();
        } else {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Couldn't update Offer!"});
        }
    });

module.exports = AUTH_ROUTER.getRouter();
