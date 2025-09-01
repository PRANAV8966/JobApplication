'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
      },
      password: {
        type:Sequelize.STRING,
        allowNull:false
      },
      /*isVerifiedAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      },
      activeJobs: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      jobDescription: {
        type:Sequelize.STRING,
        allowNull:false
      },*/
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Admins');
  }
};