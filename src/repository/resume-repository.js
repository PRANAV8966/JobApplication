const db = require('../models/index.js');
const resume = db.Resume;

class ResumeRepository {

    async findResume(userId) {
        try {
            const url = await resume.findOne({
                where: {
                    userId: userId
                }
            });
            return url;
        } catch (error) {
            console.log('some error occured at repo');
            throw error;
        }
    }
    async create(data) {
        try {
            await resume.create(data);
            return true;
        } catch (error) {
            console.log('some error occured at repo', error);
            throw error;
        }
    }

    async update(newResumeUrl, userId) {
        try {
            await resume.update({ resumeUrl: newResumeUrl }, { where: { userId: userId } });
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