import express from "express";
const router = express.Router();
import * as userController from "../controllers/user.controllers.js";
router.get("/signup", userController.signUp);
router.get("/signin", userController.signIn);

export default router;
