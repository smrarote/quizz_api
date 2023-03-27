import express from "express";
const router = express.Router();
import userRoutes from "./routes/user.routes.js";

router.use("/user", userRoutes);

export default router;
