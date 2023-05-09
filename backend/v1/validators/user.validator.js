const { body, query } = require("express-validator");
exports.signup = () => {
  return [
    body("first_name")
      .exists()
      .withMessage("first name required")
      .trim()
      .notEmpty()
      .withMessage("first name empty")
      .isAlpha()
      .withMessage("fist name only character allowed"),
    body("last_name")
      .if(body("last_name").exists())
      .trim()
      .notEmpty()
      .withMessage("last name is empty")
      .isAlpha()
      .withMessage("last name only characters allowed"),
    body("display_name")
      .if(body("display_name").exists())
      .trim()
      .notEmpty()
      .withMessage("display name is empty")
      .isAlpha()
      .withMessage("display name only characters allowed"),
    body("email")
      .exists()
      .withMessage("email is require")
      .trim()
      .isEmail()
      .withMessage("email is invalid"),
    body("password")
      .exists()
      .withMessage("password is required")
      .trim()
      .notEmpty()
      .withMessage("password is empty")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_*&%])[A-Za-z\d@_*&%]{6,20}$/
      )
      .withMessage(
        "Password must contain min : 6 max : 20, at least one lowercase letter, one uppercase letter, one number, and one of the following symbols: @, _, *, &, %"
      ),
  ];
};

exports.signin = () => {
  return [
    body("username")
      .exists()
      .withMessage("username required")
      .trim()
      .notEmpty()
      .withMessage("Username required"),
    body("password")
      .exists()
      .withMessage("password required")
      .trim()
      .notEmpty()
      .withMessage("Password is required"),
  ];
};
