const { body, query } = require("express-validator");
exports.signup = [
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
  body("mobile")
    .if(body("mobile").exists())
    .trim()
    .notEmpty()
    .withMessage("mobile no is empty")
    .isMobilePhone(["en-US", "en-CA"], { strictMode: false })
    .withMessage("invalid phone number"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username name is empty")
    .matches(/^(?=[A-Za-z0-9\-+_@#$*]{6,50}$)[A-Za-z0-9\-+_@#$*]+$/)
    .withMessage(
      "username only alphanumeric and (-,+,_,@,#,$,*,@) with 6-50 character length allowed"
    ),
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

exports.signin = [
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
