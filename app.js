import express, { urlencoded } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import routeMap from "./v1/routerMap.js";
import corsOptions from "./configs/constants/corsOpt.js";
// configure env
import path from "path";
import { fileURLToPath } from "url";
// configure path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.__basedir = __dirname;
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(global.__basedir, "config.env") });

const app = express();

// setup middlewares
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.use("/api/v1", routeMap);

app.use("*", (req, res, next) => {
  console.log("I will run ");
  next();
});
export default app;
