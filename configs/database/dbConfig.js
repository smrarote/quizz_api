import sequelize from "sequelize";
let db_host = null;
let db_port = null;
let db_user = null;
let db_pass = null;
let db_name = null;
if (process.env.NODE_ENV == "dev") {
  db_port = process.env.DEV_DB_PORT;
  db_host = process.env.DEV_DB_HOST;
  db_name = process.env.DEV_DB_NAME;
  db_pass = process.env.DEV_DB_PASS;
  db_user = process.env.DEV_DB_USER;
} else {
  db_port = process.env.DB_PORT;
  db_host = process.env.DB_HOST;
  db_name = process.env.DB_NAME;
  db_pass = process.env.DB_PASS;
  db_user = process.env.DB_USER;
}
const quizz_db = new sequelize(db_name, db_user, db_pass, {
  db_host: "localhost",
  dialect: "mariadb",
  logging: false,
  omitNull: true,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default quizz_db;
