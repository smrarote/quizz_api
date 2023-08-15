const sequelize = require("sequelize");
const pole_db = require("../../configs/database/dbConfig");
const dbTables = require("../../configs/database/dbTables");

const PoleOption = pole_db.define(
  "pole_option",
  {
    id: {
      type: sequelize.INTEGER(10),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    pole_id: {
      type: sequelize.INTEGER(10),
      allowNull: false,
    },
    pole_option: {
      type: sequelize.varchar(255),
      allowNull: false,
      validator: {
        isAlphanumeric: {
          msg: "Error : only characters and numbers allowed",
        },
        notEmpty: {
          msg: "Empty feild : pole option",
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
    image: {
      type: sequelize.STRING(500),
      allowNull: true,
      validator: {
        notEmpty: {
          msg: "Empty feild : discription",
        },
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["pole_option", "pole_id"],
      },
      {
        fields: ["pole_id"],
      },
    ],
    tableName: dbTables.POLE_OPT,
    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    engine: "innoDB",
  }
);

/**
 * Associations :
 * pole_id : id => Pole
 */

const Pole = require("./pole.model");
PoleOption.belongsTo(Pole, {
  foreignKey: "pole_id",
  targetKey: "id",
  as: "pole",
});

Pole.hasMany(PoleOption, {
  foreignKey: "pole_id",
  targetKey: "id",
  as: "options",
});
module.exports = PoleOption;
