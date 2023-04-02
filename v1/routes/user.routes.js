const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controllers");
router.get("/signup", userController.signUp);
router.get("/signin", userController.signIn);

module.exports = router;
