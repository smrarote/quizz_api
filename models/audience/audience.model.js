const sequelize = require("sequelize");
const pole_db = require("../../configs/database/dbConfig");
const dbTables = require("../../configs/database/dbTables");

const Audience = pole_db.define(
  "audience",
  {
    id: {
      type: sequelize.INTEGER(10),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    aud_master_id: {
      type: sequelize.INTEGER(10),
      allowNull: false,
    },
    name: {
      type: sequelize.STRING(255),
      allowNull: false,
    },
    uid: {
      type: sequelize.STRING(255),
      allowNull: false,
    },
    email: {
      type: sequelize.STRING(255),
      allowNull: true,
      validate: {
        isEmail: true,
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
    hooks: {
      beforeUpdate: (record) => {
        record.setDataValue("updated_at", new Date());
      },
    },
    indexes: [
      {
        unique: true,
        fields: ["uid", "email"],
      },
      {
        unique: true,
        fields: ["uid", "aud_master_id"],
      },
      {
        fields: ["aud_master_id"],
      },
    ],
    tableName: dbTables.AUDIENCE,
    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    engine: "innoDB",
  }
);

/**
 * Associations :
 * aud_master_id : id => AudienceMaster
 */

const AudienceMaster = require("../audience/audience_master.model");
Audience.belongsTo(AudienceMaster, {
  foreignKey: "aud_master_id",
  targetKey: "id",
  as: "audience_master",
});
AudienceMaster.hasMany(Audience, {
  foreignKey: "aud_master_id",
  targetKey: "id",
  as: "audiences",
});

module.exports = Audience;
