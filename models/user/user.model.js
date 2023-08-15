const sequelize = require("sequelize");
const pole_db = require("../../configs/database/dbConfig");
const dbTables = require("../../configs/database/dbTables");

const User = pole_db.define(
  "user",
  {
    id: {
      type: sequelize.INTEGER(10),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: sequelize.STRING(100),
      allowNull: false,
      unique: true,
      validator: {
        isAlphanumeric: {
          msg: "Error : only characters and numbers allowed",
        },
        notEmpty: {
          msg: "Empty feild : username",
        },
      },
    },
    first_name: {
      type: sequelize.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Empty feild : fist name",
        },
        isAlpha: {
          msg: "Error : only characters allowed",
        },
      },
    },
    last_name: {
      type: sequelize.STRING(50),
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "Empty feild : last name",
        },
        isAlpha: {
          msg: "Error : only characters allowed",
        },
      },
    },
    email: {
      type: sequelize.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    mobile: {
      type: sequelize.STRING(30),
      unique: true,
      allowNull: true,
    },
    password: {
      type: sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Empty feild : password",
        },
      },
    },
    created_at: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: sequelize.DATE,
      allowNull: true,
    },
    email_verified: {
      type: sequelize.ENUM("0", "1"),
      allowNull: false,
      defaultValue: "0",
    },
    deleted_at: {
      type: sequelize.DATE,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeUpdate: (record) => {
        record.setDataValue("updated_at", new Date());
      },
    },
    tableName: dbTables.USER,
    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    engine: "innoDB",
  }
);

module.exports = User;
