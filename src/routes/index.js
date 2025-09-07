const { Router } = require('express');
const router = Router();

const { createUser, getUser, getAllUser, signIn, uploadResume, saveResume, findResume }  = require('../controllers/user-controller.js');
const {createAdmin, getAllAdmin, getAdmin, AdminSignIn} = require('../controllers/admin-controller.js');
const { createJob, getAllJobs, getJob, getAllJobsById, create, getAvailableJobs, getAppliedJobsByUser } = require('../controllers/job-controller.js');
const { authenticate } = require('../middlewares/auth-middleware.js');
const { authenticateAdmin } =  require('../middlewares/admin-auth.js');
const upload  = require('../middlewares/multer.js');


router.get('/getUser',authenticate, getUser);
router.get('/getAdmin', authenticateAdmin, getAdmin);
router.get('/getJobs/:adminId', getAllJobsById);
router.get('/getAlljobs', getAllJobs);
router.get('/getAppliedJobs',authenticate, getAvailableJobs);
router.get('/myapplication/:userId', getAppliedJobsByUser);
router.get('/getResume/:userId', findResume);

router.post('/signUp', createUser);
router.post('/signIn', signIn);
router.post('/registerAdmin', createAdmin);
router.post('/adminSignIn', AdminSignIn);
router.post('/createJob', createJob);
router.post('/creatEntry',authenticate, create);

router.put('/saveResume',authenticate, saveResume);
router.put('/uploadResume', authenticate, upload.single('resume'), uploadResume);

module.exports = router;