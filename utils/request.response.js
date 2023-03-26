/**
 * Error wrapper function generates Error Object
 * @param {String} msg error message
 * @param {Number} statusCode status code for response
 * @param {Express.NextFunction} next next function to throw error
 * @returns {Express.NextFunction} returns error handled by global error handler
 */
const error = (msg, statusCode, next) => {
  /**
   * AppError extends from Error
   */
  class AppError extends Error {
    /**
     *
     * @param {String} message error message
     * @param {Number} statusCode response status code
     * @param {String} name name for the error
     */
    constructor(message, statusCode, name) {
      super(message);
      this.name = name;
      this.success = false;
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  return next(new AppError(msg, statusCode));
};

/**
 * response object for requests
 * @param {Express.Response} res response
 * @param {Number} statusCode response code
 * @param {String} msg error message
 * @param {Object} data response data
 * @returns {Object} response object
 */
const response = (res, statusCode, msg, data) => {
  return res.status(res).json({
    statusCode: statusCode,
    success: true,
    msg: msg,
    data: data,
  });
};
export { error, response };
