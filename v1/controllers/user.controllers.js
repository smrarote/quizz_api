import catchAsync from "../../utils/CatchAsync.js";
import winLogger from "../../utils/winston.config.js";
import { error } from "../../utils/request.response.js";
const signIn = catchAsync(async (req, res, next) => {
  res.json({
    msg: "signin",
  });
});

const signUp = catchAsync(async (req, res, next) => {
  res.json({
    msg: "signin",
  });
});

export { signIn, signUp };
