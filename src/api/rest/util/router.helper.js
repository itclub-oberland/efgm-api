const LOGGER = require("../../util/logger");
const HTTP_STATUS = require('http-status-codes');

async function wrapInFallbackResponse(req, res, callback) {
    try {
        return await callback();
    } catch (ex) {
        LOGGER.error("Server error: ", {exception: ex, request: req.url});
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({message: "Something went wrong! Sorry!"});
    }
}

module.exports = {
    wrapInFallbackResponse
};