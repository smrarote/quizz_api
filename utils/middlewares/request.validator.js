const { statusCodes, errorNames } = require("../../configs/constants/enum");
const { validationResult } = require("express-validator");
const { error } = require("../request.response");

const validator = function (req, res, next) {
  const validationerror = validationResult(req);
  if (!validationerror.isEmpty()) {
    return next(
      error(
        "validation error",
        statusCodes.BAD_REQUEST,
        errorNames.VALIDATION,
        validationerror.array(),
        next
      )
    );
  }
  return next();
};

module.exports = validator;
