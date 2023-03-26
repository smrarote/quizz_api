import app from "./app.js";
import quizz_db from "./configs/database/dbConfig.js";
import winLogger from "./utils/winston.config.js";
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
