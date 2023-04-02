// configure env
const path = require("path");
const dotenv = require("dotenv");
if (process.env.NODE_ENV === "dev") {
  dotenv.config({ path: path.join(__dirname, "dev.env") });
} else {
  dotenv.config({ path: path.join(__dirname, "prod.env") });
}
const app = require("./app");
const quizz_db = require("./configs/database/dbConfig");
const winLogger = require("./utils/winston.config");
// database connection
quizz_db
  .authenticate()
  .then(() => {
    winLogger.info(`DB CONNECTED : ${quizz_db.config.database}`);
  })
  .catch((error) => {
    winLogger.error(`DB DISCONNECTED : ${error}`);
  });

const port = process.env.PORT;
app.listen(port, () => {
  winLogger.info(`QUIZZ : ${port}`);
});
