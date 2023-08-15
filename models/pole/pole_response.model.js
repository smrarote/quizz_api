const sequelize = require("sequelize");
const pole_db = require("../../configs/database/dbConfig");
const dbTables = require("../../configs/database/dbTables");

const PoleRes = pole_db.define(
  "pole_response",
  {
    id: {
      type: sequelize.INTEGER(10),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    aud_id: {
      type: sequelize.INTEGER(10),
      allowNull: false,
    },
    pole_id: {
      type: sequelize.INTEGER(10),
      allowNull: false,
    },
    pole_optioin_id: {
      type: sequelize.INTEGER(10),
      allowNull: false,
    },
    created_at: {
      type: sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    deleted_at: {
      type: sequelize.DATE,
      allowNull: true,
    },
    comment: {
      type: sequelize.varchar(255),
      allowNull: true,
      validator: {
        notEmpty: {
          msg: "Empty feild : comment",
        },
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["aud_id", "pole_id"],
      },
      {
        fields: ["pole_id", "pole_option_id"],
      },
    ],
    tableName: dbTables.POLE_RES,
    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    engine: "innoDB",
  }
);

/**
 * Associations :
 * audi_id : id => Audience
 * pole_id : id => Pole
 * pole_option_res_id : id => PoleOption
 */

const Audience = require("../audience/audience.model");
PoleRes.belongsTo(Audience, {
  foreignKey: "aud_id",
  targetKey: "id",
  as: "voter",
});
Audience.hasMany(PoleRes, {
  foreignKey: "aud_id",
  targetKey: "id",
  as: "pole_responses",
});

const Pole = require("./pole.model");
PoleRes.belongsTo(Pole, {
  foreignKey: "pole_id",
  targetKey: "id",
  as: "pole",
});
Pole.hasMany(PoleRes, {
  foreignKey: "pole_id",
  targetKey: "id",
  as: "responses",
});

const PoleOption = require("../pole/pole_option.model");
PoleRes.belongsTo(PoleOption, {
  foreignKey: "pole_option_id",
  targetKey: "id",
  as: "option",
});
PoleOption.hasMany(PoleRes, {
  foreignKey: "pole_option_id",
  targetKey: "id",
  as: "responses",
});
module.exports = PoleRes;
