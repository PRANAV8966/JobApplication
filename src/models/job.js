'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.Admin, {
        foreignKey: "adminId",
        as: "admin"
      });
    }
  }
  Job.init({
    description: {
      type:DataTypes.STRING,
      allowNull:false
    },
    adminId: { 
      type:DataTypes.INTEGER,
      allowNull:false
    },
    expiry: { 
      type:DataTypes.DATE,
      allowNull:false
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'EXPIRED'),
        defaultValue: 'ACTIVE',
      },
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};