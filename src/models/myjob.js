'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class myJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      myJob.belongsTo(models.Job, {
      foreignKey: 'jobId',
      as: 'job'
      });

      myJob.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'applicant'
      });
    }
  }
  myJob.init({
    jobId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM('ACCEPTED','REJECTED', 'PENDING FOR REVIEW'),
      defaultValue: 'PENDING FOR REVIEW'
    }
  }, {
    sequelize,
    modelName: 'myJob',
  });
  return myJob;
};