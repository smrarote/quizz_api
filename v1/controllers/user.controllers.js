const catchAsync = require("../../utils/CatchAsync");
const winLogger = require("../../utils/winston.config");
const { error, response } = require("../../utils/request.response");

exports.signIn = catchAsync(async (req, res, next) => {
  res.json({
    msg: "signin",
  });
});

exports.signUp = catchAsync(async (req, res, next) => {
  res.json({
    msg: "signin",
  });
});
