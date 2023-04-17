const {
  Quizzer,
  catchAsync,
  winLogger,
  error,
  response,
  errorCodes,
  errorNames,
} = require("../common.imports");
const jwtAuth = require("../../services/auth/jwt");
const Roles = require("../../configs/constants/role.map");

exports.signIn = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  // Quizzer.update(
  //   { password: "Sambbhai@133" },
  //   { where: { id: 45 }, individualHooks: true }
  // );
  const user = await Quizzer.findOne({
    where: {
      email: username,
      deletedAt: null, // dont't consider the deleted accounts
    },
  });
  // verify password
  if (!user?.passwordVerify(password)) {
    return error(
      "login failed",
      errorCodes.UNOTHORIZED,
      errorNames.validation,
      null,
      next
    );
  }
  // asign the auth token with user_id signin date
  return response(res, errorCodes.SUCCESS, "login successfull", {
    token: new jwtAuth(Roles.QUIZZER).getToken({
      id: user.id,
      datetime: new Date(),
    }),
  });
});

exports.signUp = catchAsync(async (req, res, next) => {
  const { first_name, last_name, display_name, password, email } = req.body;

  // check wether user alredy exist or deleted from system...
  let user = null;
  user = await Quizzer.findOne({
    where: {
      email: email,
    },
    attributes: ["first_name", "email", "deletedAt"],
    paranoid: false, // feild to include the deleted records
  });
  if (user) {
    return user.deletedAt
      ? error(
          `User Deleted with ${email}`,
          errorCodes.UNOTHORIZED,
          errorNames.validation,
          JSON.stringify(user),
          next
        )
      : error(
          `User Exists with ${email}`,
          errorCodes.CONFLICT,
          errorNames.validation,
          JSON.stringify(user),
          next
        );
  }

  // create new user ...
  user = await Quizzer.create({
    first_name: first_name,
    password: password,
    email: email,
    ...(Boolean(last_name) && { last_name: last_name }),
    ...(Boolean(display_name) && { display_name: display_name }),
  });

  // send jwt token for the sign up
  return response(res, errorCodes.SUCCESS, "new user created", {
    first_name: user.first_name,
    email: user.email,
    createdAt: new Date(),
  });
});
