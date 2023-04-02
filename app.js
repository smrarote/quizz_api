const express = require("express");
const cors = require("cors");
const logger = require("./utils/middlewares/logger.middleware");
const helmet = require("helmet");
const routeMap = require("./v1/routes.map");
const corsOptions = require("./configs/constants/corsOpt");
const errorHandler = require("./utils/middlewares/error.middleware");
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

module.exports = app;
