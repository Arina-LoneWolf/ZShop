const router = require('express').Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAmin');

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/info', auth, userController.getInfo);

router.post('/login-google', userController.loginGoogle);

router.patch('/update-info', auth, userController.updateInfo);

router.patch('/update-pass', auth, userController.updatePass);

router.patch('/update-email', auth, userController.updateEmail);

router.post('/confirm-update-mail', auth, userController.confirmUpdateEmail);

router.get('/confirm/:token', userController.confirmMail);

router.patch('/update-mute', auth, authAdmin, userController.setMuteUser);

module.exports = router;
