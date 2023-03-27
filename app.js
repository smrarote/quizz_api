import express, { urlencoded } from "express";
import cors from "cors";
import logger from "./utils/middlewares/logger.middleware.js";
import helmet from "helmet";
import routeMap from "./v1/routes.map.js";
import corsOptions from "./configs/constants/corsOpt.js";
import errorHandler from "./utils/middlewares/error.middleware.js";
// configure env
import path from "path";
import { fileURLToPath } from "url";
// configure path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.__basedir = __dirname;
import * as dotenv from "dotenv";
if (process.env.NODE_ENV === "dev") {
  dotenv.config({ path: path.join(global.__basedir, "dev.env") });
} else {
  dotenv.config({ path: path.join(global.__basedir, "prod.env") });
}

const app = express();

// setup middlewares
app.use(logger);
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.use("/api/v1", routeMap);

app.use(errorHandler);
app.use("*", (req, res, next) => {
  console.log("I will run ");
  next();
});
export default app;
