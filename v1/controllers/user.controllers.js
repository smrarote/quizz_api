const {
  User,
  catchAsync,
  winLogger,
  error,
  response,
  statusCodes,
  errorNames,
  Op,
} = require("../common.imports");
const bcrypt = require("../../services/auth/bcrypt");
const jwtAuth = require("../../services/auth/jwt");
const Roles = require("../../configs/constants/role.map");
exports.signIn = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: username }, { username: username }],
    },
    attributes: ["first_name", "last_name", "username", "email", "password"],
  });

  if (!user || !bcrypt.compareHash(password, user?.password)) {
    return error(
      `login failed : ${username}`,
      statusCodes.UNAUTHORIZED,
      errorNames.UNAUTHORIZED,
      req.body,
      next
    );
  }
  // asign the auth token with user_id signin date\
  winLogger.info(`user ${user.id} logged in ${new Date()}`);
  return response(res, statusCodes.SUCCESS, `login success ${username}`, {
    user: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      username: user?.username,
    },
    token: jwtAuth.getToken(
      {
        id: user.id,
        role: Roles.USER,
        datetime: new Date(),
      },
      process.env.JWTEXPIRY
    ),
  });
});

exports.signUp = catchAsync(async (req, res, next) => {
  const { first_name, last_name, username, password, email } = req.body;

  // check wether user alredy exist or deleted from system...
  let user = null;
  user = await User.findOne({
    where: {
      [Op.or]: [{ email: email }, { username: username }],
    },
    attributes: ["first_name", "email", "deleted_at"],
    paranoid: false, // feild to include the deleted records
  });
  if (user) {
    return user.deleted_at
      ? error(
          `User Deleted with ${email}`,
          statusCodes.UNAUTHORIZED,
          errorNames.VALIDATION,
          { first_name: user?.first_name, email: user?.email },
          next
        )
      : error(
          `User Exists with ${email}`,
          statusCodes.CONFLICT,
          errorNames.VALIDATION,
          { first_name: user?.first_name, email: user?.email },
          next
        );
  }

  // create new user ...
  user = await User.create({
    first_name: first_name,
    password: bcrypt.createHash(password),
    email: email,
    username: username,
    ...(Boolean(last_name) && { last_name: last_name }),
  });

  // send jwt token for the sign up
  return response(res, statusCodes.SUCCESS, "new user created", {
    first_name: user.first_name,
    email: user.email,
    created_at: new Date(),
  });
});
