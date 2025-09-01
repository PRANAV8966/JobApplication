const { JobRepository } = require('../repository/job-repository.js');

class JobService {

     constructor() {
        this.jobService =  new JobRepository();
    }

     async createJob(data) {
        try {
            const admin = await this.jobService.createJob(data);
            return admin;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async getJob(id) {
        try {
            const admin = await this.jobService.getJob(id);
            return admin;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async destroy(id) {
        try {
            const admin = await this.jobService.destroy(id);
            return admin;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }

     async getAllJobs(adminId) {
        try {
            const admins = await this.jobService.getAllJobs(adminId);
            return admins;
        } catch (error) {
            console.log('some error occured at service', error);
            throw error;
        }
     }
}

module.exports = {
    JobService
}