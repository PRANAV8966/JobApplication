const { where } = require('sequelize');
const db = require('../models/index.js');
const jobs = db.Job;

class JobRepository {

     async createJob(data) {
        try {
            const user = await jobs.create(data);
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async getJob(id) {
        try {
            const user = await jobs.findByPk(id);
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async destroy(id) {
        try {
            const user = await jobs.destroy({
                where:{id : id}
            });
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async getAllJobs(adminId) {
        try {
            const users = await jobs.findAll({
                where: {
                    adminId: adminId
                }
            });
            return users;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }
}

module.exports = {
    JobRepository
}