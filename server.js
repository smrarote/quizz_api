import app from "./app.js";
import quizz_db from "./configs/database/dbConfig.js";
quizz_db
  .authenticate()
  .then(() => {
    console.log(
      `DB Connected : ${process.env.NODE_ENV} : ${JSON.stringify(
        quizz_db.config.database
      )}`
    );
  })
  .catch((error) => {
    console.log(`DB Disconnected : ${error}`);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Quizz on port : ${port}`);
});
sss;
// database connection
