import morgan from "morgan";
import winLogger from "../winston.config.js";

const stream = {
  write: (message) => winLogger.http(message),
};

const logger = morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  { stream }
);

export default logger;
