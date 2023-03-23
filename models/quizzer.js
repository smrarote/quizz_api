import sequelize from "sequelize";
import quizz_db from "../configs/database/dbConfig.js";
import dbTables from "../configs/database/dbTables.js";

const Quizzer = quizz_db.define(
  "Quizzer",
  {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Please provide a first name",
        },
      },
    },
    lastName: {
      type: sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "Please provide a last name",
        },
      },
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    displayName: {
      type: sequelize.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "Please provide a display name",
        },
      },
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
      validate: {
        len: [6, 50],
        notEmpty: true,
      },
    },
    createdAt: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: dbTables.QUIZZER_TABLE,
  }
);
export default Quizzer;
