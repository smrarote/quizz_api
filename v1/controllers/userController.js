import catchAsync from "../../utils/CatchAsync.js";

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
