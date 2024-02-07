const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust the path as needed

class User extends Model {}

User.init(
  {
    // Define columns based on the SQL schema
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    AgeRange: {
      type: DataTypes.STRING
    },
    Location: {
      type: DataTypes.STRING
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    PhoneNumber: {
      type: DataTypes.STRING
    },
    WorkSchedule: {
      type: DataTypes.STRING
    },
    PetOwnershipExperience: {
      type: DataTypes.STRING
    },
    ReasonForAdopting: {
      type: DataTypes.TEXT
    },
    ActivityLevel: {
      type: DataTypes.STRING
    },
    TrainingWillingness: {
      type: DataTypes.STRING
    },
    TypeOfResidence: {
      type: DataTypes.STRING
    },
    LivingSituation: {
      type: DataTypes.STRING
    },
    OutdoorSpaceAvailability: {
      type: DataTypes.BOOLEAN
    },
    PersonalStatement: {
      type: DataTypes.TEXT
    }
  },
  {
    sequelize,
    timestamps: false, // Adjust based on your requirement
    freezeTableName: true,
    underscored: true,
    modelName: 'user' // Ensure this is singular, as Sequelize defaults to pluralized table names
  }
);

module.exports = User;
