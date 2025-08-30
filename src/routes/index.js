const { Router } = require('express');
const router = Router();

const { createUser, getUser, getAllUser, signIn }  = require('../controllers/user-controller.js');;
const { authenticate } = require('../middlewares/auth-middleware.js');

router.get('/getUser',authenticate, getUser);

router.post('/signUp', createUser);
router.post('/signIn', signIn);

module.exports = router;