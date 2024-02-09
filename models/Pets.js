const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pets extends Model { }

Pets.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    breed: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.STRING,
    },

    size: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    age: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gender: {
      type: DataTypes.STRING,
    },

    coat: {
      type: DataTypes.STRING
    },

    color: {
      type: DataTypes.STRING,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        
      },
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pets',
  }
);

module.exports = Pets;


