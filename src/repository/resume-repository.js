const db = require('../models/index.js');
const resume = db.Resume;

class ResumeRepository {
    async create(data) {
        try {
            await resume.create(data);
            return true;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
    }

    async update(data, userId) {
        try {
            await resume.update({
                where: {
                    userId: userId
                }
            });
            return true;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
    }
}

module.exports = {
    ResumeRepository
}