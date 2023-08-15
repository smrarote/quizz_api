// configure env
const path = require("path");
const dotenv = require("dotenv");
if (process.env.NODE_ENV === "dev") {
  dotenv.config({ path: path.join(__dirname, ".env.dev") });
} else {
  dotenv.config({ path: path.join(__dirname, ".env.prod") });
}
const app = require("./app");
const pole_db = require("./configs/database/dbConfig");
const winLogger = require("./utils/winston.config");
// database connection
pole_db
  .authenticate()
  .then(() => {
    winLogger.info(`DB CONNECTED : ${pole_db.config.database}`);
  })
  .catch((error) => {
    winLogger.error(`DB DISCONNECTED : ${error}`);
  });

const port = process.env.PORT;
app.listen(port, () => {
  winLogger.info(`QUIZZ : ${port}`);
});
