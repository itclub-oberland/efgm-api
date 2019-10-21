const winston = require("winston");
const moment = require("moment");

const level = process.env.LOG_LEVEL || 'debug';
const env = process.env.NODE_ENV || 'development';

const consoleLogger = new winston.transports.Console({
    level: level,
    format: winston.format.combine(
        winston.format((info, opts) => {
            info.timestamp = moment(info.timestamp).format('DD.MM.YYYY HH:mm:ss');
            info.level = info.level.toUpperCase();
            return info
        })(),
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.label({label: process.env.LABEL || "SERVER"}),
        winston.format.printf((info) => {
            let message = `${info.timestamp} [${info.label}] ${info.level} ${info.message}`;
            for (let arg of info[Symbol.for("splat")]) {
                message += "" + JSON.stringify(arg);
            }
            return message;
        }),
    )
});

const fileLogger = new winston.transports.File({
    filename: 'src/resource/log/app.log',
    format: winston.format.combine(
        winston.format((info, opts) => {
            info.timestamp = moment(info.timestamp).format('DD.MM.YYYY HH:mm:ss');
            info.level = info.level.toUpperCase();
            return info
        })(),
        winston.format.timestamp(),
        winston.format.simple(),
        winston.format.label({label: process.env.LABEL || "SERVER"}),
        winston.format.printf((info) => {
            let message = `${info.timestamp} [${info.label}] ${info.level} ${info.message}`;
            for (let arg of info[Symbol.for("splat")]) {
                message += "" + JSON.stringify(arg);
            }
            return message;
        }),
    )
});

let transports = [];

if (env === "development") {
    transports.push(consoleLogger);
    transports.push(fileLogger);
}

if (env === "production" || env === 'test') {
    transports.push(fileLogger);
}

const logger = winston.createLogger({
    transports: transports
});

module.exports = logger;
