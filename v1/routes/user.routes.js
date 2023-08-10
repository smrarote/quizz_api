const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
const { signup, signin } = require("../validators/user.validator");
const validator = require("../../utils/middlewares/request.validator");

router.route("/signup").post(signup, validator, userController.signUp);
router.route("/signin").post(signin, validator, userController.signIn);
module.exports = router;
