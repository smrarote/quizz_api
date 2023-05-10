const sequelize = require("sequelize");
const quizz_db = require("../configs/database/dbConfig");
const dbTables = require("../configs/database/dbTables");
const passHash = require("../services/auth/bcrypt");
const Quizzer = quizz_db.define(
  "Quizzer",
  {
    id: {
      type: sequelize.INTEGER(30),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    first_name: {
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
    last_name: {
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
    display_name: {
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
          msg: "password length min : 6, max : 20",
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
    email_verified: {
      type: sequelize.ENUM("0", "1"),
      allowNull: false,
      defaultValue: "0",
    },
    deletedAt: {
      type: sequelize.DATE,
      allowNull: true,
    },
  },
  {
    tableName: dbTables.QUIZZER_TABLE,
    paranoid: true,
    engine: "innoDB",
  }
);

Quizzer.addHook("beforeSave", (user, options) => {
  if (user.changed("password")) {
    user.password = passHash.createHash(user.password);
  }
});

Quizzer.prototype.passwordVerify = function (password) {
  return passHash.compareHash(password, this.password);
};

module.exports = Quizzer;
