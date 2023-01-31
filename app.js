import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import routeMap from "./v1/routerMap.js";
const app = express();
// setup middlewares
app.use(morgan("dev"));
const corsOptions = {
  origin: [process.env.DEV_URl, process.env.BETA_URL, process.env.BASE_URL],
  optionsSucessStatus: 200,
};
app.use(cors(corsOptions));
app.use(helmet());

app.use("/api/v1", routeMap);

export default app;
