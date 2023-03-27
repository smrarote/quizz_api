import winLogger from "../winston.config.js";
const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  winLogger.error(
    `url : ${req.url} body : ${JSON.stringify(
      req.body
    )} query : ${JSON.stringify(req.query)} stack :  ${err.stack}`
  );
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "dev" ? err.stack : {},
  });
};

export default errorHandler;
