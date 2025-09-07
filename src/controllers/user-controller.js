const { UserService } = require('../services/user-service.js');
const userController = new UserService();

const { ResumeRepository } = require('../repository/resume-repository.js');
const resumeRepository = new ResumeRepository();

const { Upload } = require('@aws-sdk/lib-storage');
const s3Client = require('../config/s3-config');


const db = require('../models/index.js');
const resume = db.Resume;

const createUser = async (req, res) => {
    try {
        const user = await userController.create(req.body);
        return res.status(200).json({
            data:user,
            success:true,
            message: 'successfully created user',
            error:{}
        });
    } catch (error) {
        console.log('some error occured at controller', error);
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to create user',
            error:error
        });
    }
}

const getUser = async (req, res) => {
    try {
        const user = await userController.getUser(req.body.userId);
        return res.status(200).json({
            data:user,
            success:true,
            message: 'successfully fetched user',
            error:{}
        });
    } catch (error) {
        console.log('some error occured at controller', error);
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to fetch user',
            error:error
        });
    }
}

const getAllUser = async (req, res) => {
    try {
        const user = await userController.getAllUser();
        return res.status(200).json({
            data:user,
            success:true,
            message: 'successfully fetched all users',
            error:{}
        });
    } catch (error) {
        console.log('some error occured at controller', error);
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to fetch users',
            error:error
        });
    }
}

const signIn = async (req, res) => {
    try {
        const user = await userController.signIn(req.body);
        return res.status(200).json({
            data:user,
            success:true,
            message: 'successfully Signed-In user',
            error:{}
        });
    } catch (error) {
        console.log('some error occured at controller', error);
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to signIn user',
            error:error
        });
    }
}


const uploadResume = async (req, res) => {
  try {
    const filePath = req.file.location;
    return res.json({ 
      success: true, 
      url: filePath, 
      file: req.file 
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const saveResume = async (req, res) => {
    try {
        await resumeRepository.create(req.body);
        return res.status(200).json({
            success:true,
            message: 'successfully Signed-In user',
            error:{}
        });
         
    } catch (error) {
        console.log('some error occured at controller', error);
        return res.status(500).json({
            data:{},
            success:false,
            message : 'failed to save resume',
            error:error
        });
    }
}


module.exports = {
    createUser,
    getAllUser,
    getUser,
    signIn,
    saveResume,
    uploadResume
}