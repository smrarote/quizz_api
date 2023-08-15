const sequelize = require("sequelize");
let db_port = process.env.DB_PORT;
let db_host = process.env.DB_HOST;
let db_name = process.env.DB_NAME;
let db_pass = process.env.DB_PASS;
let db_user = process.env.DB_USER;
const pole_db = new sequelize(db_name, db_user, db_pass, {
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

module.exports = pole_db;
