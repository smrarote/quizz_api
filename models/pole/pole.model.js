const sequelize = require("sequelize");
const pole_db = require("../../configs/database/dbConfig");
const dbTables = require("../../configs/database/dbTables");

const Pole = pole_db.define(
  "pole",
  {
    id: {
      type: sequelize.INTEGER(10),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    pole_master_id: {
      type: sequelize.INTEGER(10),
      allowNull: false,
    },
    pole_title: {
      type: sequelize.varchar(255),
      allowNull: false,
      validator: {
        isAlphanumeric: {
          msg: "Error : only characters and numbers allowed",
        },
        notEmpty: {
          msg: "Empty feild : pole title",
        },
      },
    },
    disc: {
      type: sequelize.TEXT,
      allowNull: true,
      validator: {
        notEmpty: {
          msg: "Empty feild : discription",
        },
      },
    },
    banner: {
      type: sequelize.STRING(500),
      allowNull: true,
      validator: {
        notEmpty: {
          msg: "Empty feild : banner",
        },
      },
    },
    deleted_at: {
      type: sequelize.DATE,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["pole_master_id", "pole_title"],
      },
    ],
    tableName: dbTables.POLE,
    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    engine: "innoDB",
  }
);

/**
 * Associations :
 * pole_master_id : id => POleMaster
 */

const PoleMaster = require("./pole_master.model");
Pole.belongsTo(PoleMaster, {
  foreignKey: "pole_master_id",
  targetKey: "id",
  as: "pole_master",
});

PoleMaster.hasMany(Pole, {
  foreignKey: "pole_master_id",
  targetKey: "id",
  as: "poles",
});

module.exports = Pole;
