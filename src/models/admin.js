'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');
const { SALT } = require('../config/server-config.js');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasMany(models.Job,{
        foreignKey: "adminId",
        as: "jobs", // alias
      });
    }
  }
  Admin.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    companyName: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email:{
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false
    },/*    ,
    isVerifiedAdmin: {
      type:DataTypes.BOOLEAN,
      allowNull:false
    },
    activeJobs: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    jobDescription: {
      type:DataTypes.STRING,
      allowNull:false
    }
    */
  }, {
    sequelize,
    modelName: 'Admin',
  });
  Admin.beforeCreate(async (admin, options) => {
    const hashedPassword = await bcrypt.hash(admin.password, parseInt(SALT));
    admin.password = hashedPassword;
  });
  return Admin;
};