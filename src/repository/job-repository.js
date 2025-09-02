const { where } = require('sequelize');
const db = require('../models/index.js');
const Job = db.Job;
const MyJob = db.myJob;

class JobRepository {

     async createJob(data) {
        try {
            const user = await Job.create(data);
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async getJob(id) {
        try {
            const user = await Job.findByPk(id);
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async destroy(id) {
        try {
            const user = await Job.destroy({
                where:{id : id}
            });
            return user;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

     async getAllJobsById(adminId) {
        try {
            const users = await Job.findAll({
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

     async getAllJobs() {
        try {
            const users = await Job.findAll({
                attributes: ['description', 'expiry', 'status', 'title', 'id']
            });
            return users;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
     }

        // async  getAllJobs(userId) {
        // try {
        //     const appliedJobIds = await MyJob.findAll({
        //         where: { userId },
        //         attributes: ['jobId']
        //     }).then(rows => rows.map(r => r.jobId));

        //     const jobs = await Job.findAll({
        //     where: {
        //         id: { [Op.notIn]: appliedJobIds },
        //         status: 'ACTIVE'
        //     },
        //     attributes: ['id', 'title', 'description', 'expiry', 'status']
        //     });

        //     return jobs;
        // } catch (error) {
        //     console.error('Error fetching jobs:', error);
        //     throw error;
        // }
        // }
}

class MyJobRepository {

    async creatEntry(data) {
        try {
            await MyJob.create(data);
            return true;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
    }
    
    async getAppliedJobsByUser(userId) {
        try {
            const appliedJobs =  await MyJob.findAll({
                where: { userId: userId },
                include: [
                {
                    model: Job,
                    as: "job", 
                    attributes: ["id", "title", "description", "expiry", "status"]
                }
                ]
            });
            return appliedJobs;
        } catch (error) {
        console.log("Error fetching applied jobs:", error);
        throw error;
        }
    }

}

module.exports = {
    JobRepository,
    MyJobRepository
}