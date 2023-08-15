const sequelize = require("sequelize");
const pole_db = require("../../configs/database/dbConfig");
const dbTables = require("../../configs/database/dbTables");

const AudienceMaster = pole_db.define(
  "audience_master",
  {
    id: {
      type: sequelize.INTEGER(10),
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    aud_title: {
      type: sequelize.STRING(255),
      allowNull: false,
    },
    created_by: {
      type: sequelize.INTEGER(10),
      allowNull: false,
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
        fields: ["aud_title", "created_by"],
      },
      {
        fields: ["created_by"],
      },
    ],
    tableName: dbTables.AUDIENCE_MASTER,
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
 */

const User = require("../user/user.model");
Audience.belongsTo(User, {
  foreignKey: "created_by",
  targetKey: "id",
  as: "creator",
});
User.hasMany(Audience, {
  foreignKey: "created_by",
  targetKey: "id",
  as: "audience_masters",
});

module.exports = AudienceMaster;
