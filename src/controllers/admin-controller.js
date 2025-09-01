const { AdminService } = require('../services/admin-service.js');
const adminController = new AdminService();

const createAdmin = async (req, res) => {
    try {
        const user = await adminController.create(req.body);
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

const getAdmin = async (req, res) => {
    try {
        const user = await adminController.getAdmin(req.body.adminId);
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

const getAllAdmin = async (req, res) => {
    try {
        const user = await adminController.getAllAdmins();
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

const AdminSignIn = async (req, res) => {
    try {
        const admin = await adminController.signIn(req.body);
        return res.status(200).json({
            data:admin,
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

module.exports = {
    createAdmin,
    getAllAdmin,
    getAdmin,
    AdminSignIn
}