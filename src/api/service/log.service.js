const db = require("./domain/db");
const Log = db.log;
const Op = db.Sequelize.Op;

function options(pathParams) {
    let query = {};
    if (pathParams.logId) {
        query.id = {
            [Op.eq]: pathParams.logId
        }
    }
    if (pathParams.userId) {
        query.userId = {
            [Op.eq]: pathParams.userId
        }
    }
    return {
        where: query
    }
}

async function createLog(pathParams, logDto) {
    if (pathParams.userId) {
        logDto.userId = pathParams.userId;
    }
    return await Log.create(logDto);
}

async function getLogById(pathParams) {
    return await Log.findOne(options(pathParams));
}

async function updateLogById(pathParams, logDto) {
    let log = await getLogById(pathParams);
    if (log) {
        let updatedLog = await log.update({
            type: logDto.type,
            description: logDto.description,
        }, {fields: ['type', 'description']});
        return updatedLog.dataValues;
    }
    return log;
}

async function removeLogById(pathParams) {
    return Boolean(await Log.destroy(options(pathParams)));
}

async function findAll(pathParams) {
    return await Log.findAll(options(pathParams));
}

module.exports = {
    createLog,
    findAll,
    getLogById,
    removeLogById,
    updateLogById
};
