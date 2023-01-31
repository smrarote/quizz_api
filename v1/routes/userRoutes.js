import express from "express";
const router = express.Router();
import * as userController from "../controllers/userController.js";
router.get("/", userController.getUser);

export default router;
