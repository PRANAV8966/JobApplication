const { JobService } = require('../services/job-service.js');
const { MyJobRepository } = require('../repository/job-repository.js')
const jobController = new JobService();
const myJobController = new MyJobRepository();

const { Op } = require('sequelize');

const db = require('../models/index.js');
const job = db.Job;
const MyJob = db.myJob;

const create = async (req, res) => {
    try {
        await myJobController.creatEntry(req.body);
        return res.status(200).json({
            success:true,
            message: 'successfully created job',
            error:{}
        })
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

const createJob = async (req, res) => {
    try {
        console.log('this is the req body', req.body);
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

const getAllJobsById = async (req, res) => {
    try {
        const user = await jobController.getAllJobsById(req.params.adminId);
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

const getAllJobs = async (req, res) => {
    try {
        const user = await jobController.getAllJobs();
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

const getAvailableJobs = async (req, res) => {
  try {
    const userId = req.body.userId; // from JWT auth middleware

    // First, get all jobs the user has already applied for
    const appliedJobs = await MyJob.findAll({
      where: { userId: userId },
      attributes: ["jobId"],
    });

    const appliedJobIds = appliedJobs.map(j => j.jobId);

    // Fetch jobs excluding applied ones
    const jobs = await job.findAll({
      where: {
        id: {
          [Op.notIn]: appliedJobIds.length > 0 ? appliedJobIds : [0], // exclude applied
        }
      }
    });

    res.json({ success: true, data: jobs });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    return res.status(500).json({
            data:{},
            success:false,
            message : 'server error',
            error:error
        });
  }
};

const getAppliedJobsByUser = async (req, res) => {
    try {
        const appliedJobs = await myJobController.getAppliedJobsByUser(req.params.userId);
        return res.status(200).json({
            data:appliedJobs,
            message:'successfully fetched the applied jobs',
            success:true,
            error:{}
        });
    } catch (error) {
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to fetch applied jobs',
            error:error
        });
    }
}

module.exports = {
    createJob,
    getAllJobsById,
    getAllJobs,
    getJob,
    create,
    getAvailableJobs,
    getAppliedJobsByUser
}