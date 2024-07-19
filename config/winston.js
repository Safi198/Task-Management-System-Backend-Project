const winston = require("winston");

const logger = winston.createLogger({
    level: info,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(
            ({ timestamp, level, message }) =>
                `${timestamp} ${level}: ${message}`
        )
    ),
    transports: [
        new winston.transport.Console(),
        new winston.transports.File({ filename: `error.log`, level: `error` }),
        new winston.transports.File({ filename: `combined.log` }),
    ],
});

module.exports = logger;
