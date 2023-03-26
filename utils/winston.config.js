// import winston from "winston";
import path from "path";
import fs from "fs";
import winston from "winston";
import "winston-daily-rotate-file";

const levels = {
  error: 0,
  http: 1,
  warn: 2,
  info: 3,
  debug: 4,
};
// create logs folder if not presentin root
import __dirname from "./root.path.js";

(async () => {
  const logDir = path.join(__dirname, "../logs");
  const mainDir = path.join(__dirname, "../logs/main");
  const errorDir = path.join(__dirname, "../logs/error");
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }
  if (!fs.existsSync(mainDir)) {
    fs.mkdirSync(mainDir);
  }
  if (!fs.existsSync(errorDir)) {
    fs.mkdirSync(errorDir);
  }
})();

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

const transports = [
  new winston.transports.Console({
    // colorize: "all",
  }),
  new winston.transports.DailyRotateFile({
    level: "error",
    filename: "app-error-%DATE%.log",
    dirname: "logs/error",
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  }),
  new winston.transports.DailyRotateFile({
    filename: "app-info-%DATE%.log",
    dirname: "logs/main",
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  }),
];

const winLogger = winston.createLogger({
  levels,
  format,
  transports,
});
export default winLogger;
