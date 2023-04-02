const morgan = require("morgan");
const winLogger = require("../winston.config");

const stream = {
  write: (message) => winLogger.http(message),
};

const logger = morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  { stream }
);

module.exports = logger;
