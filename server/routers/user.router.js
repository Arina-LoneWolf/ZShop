import express from 'express';
import userController from '../controllers/user.controller.js';
import userValidate from '../validates/user.validate.js';
import { auth } from '../middleware/auth.js';
import { authAdmin } from '../middleware/authAmin.js';

const router = express.Router();

router.post('/register', userValidate.register, userController.register);

router.post('/login', userValidate.login, userController.login);

router.post('/login-google', userController.loginGoogle);

router.post('/confirm-update-mail', auth, userController.confirmUpdateEmail);

router.get('/confirm/:token', userController.confirmMail);

router.get('/info', auth, userController.getInfo);

router.patch('/update-info', auth, userController.updateInfo);

router.patch('/update-pass', auth, userController.updatePass);

router.patch('/update-mute', auth, authAdmin, userController.setMuteUser);

router.patch('/update-email', auth, userController.updateEmail);

export default router;
