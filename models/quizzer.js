import sequelize from "sequelize";
import quizz_db from "../configs/database/dbConfig.js";
import dbTables from "../configs/database/dbTables.js";

const Quizzer = quizz_db.define(
  "Quizzer",
  {
    id: {
      type: sequelize.INTEGER(30),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Error : provide first name",
        },
        isAlpha: {
          msg: "Error : only characters allowed",
        },
      },
    },
    lastName: {
      type: sequelize.STRING(50),
      allowNull: true,
    },
    email: {
      type: sequelize.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    displayName: {
      type: sequelize.STRING(50),
      allowNull: true,
    },
    password: {
      type: sequelize.STRING(100),
      allowNull: false,
      isAlpha: true,
      validate: {
        len: {
          args: [6, 50],
          msg: "password length min : 6, max : 50",
        },
        notEmpty: {
          msg: "required : password",
        },
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
      onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    tableName: dbTables.QUIZZER_TABLE,
    paranoid: true,
    engine: "innoDB",
  }
);
export default Quizzer;
