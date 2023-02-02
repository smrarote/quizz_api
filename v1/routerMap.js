import express from "express";
const router = express.Router();
import userRoutes from "./routes/userRoutes.js";

router.use("/user", userRoutes);

export default router;
