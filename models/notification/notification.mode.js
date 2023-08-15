const sequelize = require("sequelize");
const pole_db = require("../../configs/database/dbConfig");
const dbTables = require("../../configs/database/dbTables");

const Notification = pole_db.define(
  "user",
  {
    id: {
      type: sequelize.INTEGER(10),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: sequelize.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    content: {
      type: sequelize.JSON,
      allowNull: false,
    },
    template: {
      type: sequelize.ENUM(
        "VERIFICATION",
        "INVITATION",
        "RESULT",
        "INFO",
        "TEST"
      ),
      allowNull: false,
      defaultValue: "TEST",
    },
    status: {
      type: sequelize.ENUM("PENDING", "DELIVERED", "NOT_REACHABLE"),
      allowNull: false,
      defaultValue: "PENDING",
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
    tableName: dbTables.NOTIFICATION,
    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    engine: "innoDB",
  }
);

module.exports = Notification;
