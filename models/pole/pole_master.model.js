const sequelize = require("sequelize");
const pole_db = require("../../configs/database/dbConfig");
const dbTables = require("../../configs/database/dbTables");

const PoleMaster = pole_db.define(
  "pole_option",
  {
    id: {
      type: sequelize.INTEGER(10),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    created_by: {
      type: sequelize.INTEGER(10),
      allowNull: false,
    },
    start_at: {
      type: sequelize.DATE,
      allowNull: false,
    },
    end_at: {
      type: sequelize.DATE,
      allowNull: true,
    },
    aud_master_id: {
      type: sequelize.INTEGER(10),
      allowNull: true,
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
        fields: ["created_by", "aud_master_id"],
      },
    ],
    tableName: dbTables.POLE_MASTER,
    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    engine: "innoDB",
  }
);

/**
 * Associations :
 * created_by : id => User
 * aud_master_id : id => audience_master
 */

const User = require("../user/user.model");
User.hasMany(PoleMaster, {
  foreignKey: "created_by",
  targetKey: "id",
  as: "poles",
});
PoleMaster.belogsTo(User, {
  foreignKey: "created_by",
  targetKey: "id",
  as: "poller",
});

const AudienceMaster = require("../audience/audience_master.model");
User.hasMany(AudienceMaster, {
  foreignKey: "aud_master_id",
  targetKey: "id",
  as: "audiences",
});
AudienceMaster.belogsTo(User, {
  foreignKey: "aud_master_id",
  targetKey: "id",
  as: "creator",
});

module.exports = PoleMaster;
