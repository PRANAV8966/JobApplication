const { JobService } = require('../services/job-service.js');
const jobController = new JobService();

const createJob = async (req, res) => {
    try {
        const user = await jobController.createJob(req.body);
        return res.status(200).json({
            data:user,
            success:true,
            message: 'successfully created job',
            error:{}
        });
    } catch (error) {
        console.log('some error occured at controller', error);
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to create job',
            error:error
        });
    }
}

const getJob = async (req, res) => {
    try {
        const user = await jobController.getJob(req.body.adminId);
        return res.status(200).json({
            data:user,
            success:true,
            message: 'successfully fetched job',
            error:{}
        });
    } catch (error) {
        console.log('some error occured at controller', error);
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to fetch job',
            error:error
        });
    }
}

const getAllJobs = async (req, res) => {
    try {
        const user = await jobController.getAllJobs(req.params.adminId);
        return res.status(200).json({
            data:user,
            success:true,
            message: 'successfully fetched all jobs',
            error:{}
        });
    } catch (error) {
        console.log('some error occured at controller', error);
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to fetch jobs',
            error:error
        });
    }
}


module.exports = {
    createJob,
    getAllJobs,
    getJob
}