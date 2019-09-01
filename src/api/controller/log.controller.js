const LOGGER = require("@api/util/logger");
const HTTP_STATUS = require('http-status-codes/index');
const LOG_SERVICE = require("@service/log.service");

async function getAll(req, res, next) {
    let pathParams = {userId} = req.params;
    let logs = await LOG_SERVICE.findAll(pathParams);
    if (logs) {
        return res.status(HTTP_STATUS.OK).json(logs);
    }
    throw {message: "Logs couldn't be retrieved!"};
}

async function create(req, res, next) {
    let logDto = {type, description} = req.body;
    let pathParams = {userId} = req.params;
    let log = await LOG_SERVICE.createLog(pathParams, logDto);
    if (log) {
        LOGGER.info("Log created:", log);
        return res.status(HTTP_STATUS.OK).json(log);
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json();
    }
}

async function getOne(req, res, next) {
    let pathParams = {userId, logId} = req.params;
    let log = await LOG_SERVICE.getLogById(pathParams);
    if (log) {
        return res.status(HTTP_STATUS.OK).json(log);
    } else {
        return res.status(HTTP_STATUS.NOT_FOUND).json({message: "Log not found"})
    }
}

async function update(req, res, next) {
    let logDto = {type, description} = req.body;
    let pathParams = {userId, logId} = req.params;
    let updatedLog = await LOG_SERVICE.updateLogById(pathParams, logDto);
    if (updatedLog) {
        LOGGER.info("Log updated:", updatedLog);
        return res.status(HTTP_STATUS.NO_CONTENT).json();
    } else {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({message: "Couldn't update Log!"});
    }
}

async function remove(req, res, next) {
    let pathParams = {userId, logId} = req.params;
    let operationStatus = Boolean(await LOG_SERVICE.removeLogById(pathParams));
    if (operationStatus) {
        LOGGER.info("Log deleted:", `Log ID ${req.params.logId}.`);
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
