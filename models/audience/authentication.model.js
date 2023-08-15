const sequelize = require("sequelize");
const pole_db = require("../../configs/database/dbConfig");
const dbTables = require("../../configs/database/dbTables");

const Authentication = pole_db.define(
  "audience_master",
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
    pole_master_id: {
      type: sequelize.INTEGER(10),
      allowNull: false,
    },
    password: {
      type: sequelize.STRING(255),
      allowNull: true,
      notEmpty: {
        msg: "Empty feild : password",
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
    indexes: [
      {
        unique: true,
        fields: ["aud_id", "pole_master_id"],
      },
      {
        fields: ["pole_master_id"],
      },
    ],
    tableName: dbTables.AUTHENTICATION,
    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    engine: "innoDB",
  }
);

/**
 * Associations :
 * aud_id : id => Audience
 * pole_master_id : id => PoleMaster
 */

const Audience = require("../audience/audience.model");
Audience.hasMany(Authentication, {
  foreignKey: "aud_id",
  targetKey: "id",
  as: "authentications",
});
Authentication.belogsTo(Audience, {
  foreignKey: "aud_id",
  targetKey: "id",
  as: "audience",
});

const PoleMaster = require("../pole/pole_master.model");
Authentication.belogsTo(PoleMaster, {
  foreignKey: "pole_master_id",
  targetKey: "id",
  as: "pole_master",
});

PoleMaster.hasMany(Authentication, {
  foreignKey: "pole_master_id",
  targetKey: "id",
  as: "authentications",
});

module.exports = Authentication;
