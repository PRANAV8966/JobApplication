const { Router } = require('express');
const router = Router();

const { createUser, getUser, getAllUser, signIn }  = require('../controllers/user-controller.js');
const {createAdmin, getAllAdmin, getAdmin, AdminSignIn} = require('../controllers/admin-controller.js');
const { createJob, getAllJobs, getJob } = require('../controllers/job-controller.js');
const { authenticate } = require('../middlewares/auth-middleware.js');
const { authenticateAdmin } =  require('../middlewares/admin-auth.js');

router.get('/getUser',authenticate, getUser);
router.get('/getAdmin', authenticateAdmin, getAdmin);
router.get('/getJobs/:adminId', getAllJobs);


router.post('/signUp', createUser);
router.post('/signIn', signIn);
router.post('/registerAdmin', createAdmin);
router.post('/adminSignIn', AdminSignIn);
router.post('/createJob', createJob);


module.exports = router;