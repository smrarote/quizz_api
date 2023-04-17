const winLogger = require("../winston.config");
const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  const errBody = err.error || {};
  const errName = err.name || "";
  winLogger.error(
    `url : ${req.url} body : ${JSON.stringify(
      req.body
    )} query : ${JSON.stringify(req.query)} stack :  ${err.stack}`
  );
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    name: errName,
    error: errBody,
    stack: process.env.NODE_ENV === "dev" ? err.stack : {},
  });
};

module.exports = errorHandler;
