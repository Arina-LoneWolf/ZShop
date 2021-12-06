import express from 'express';
import typeController from '../controllers/type.controller.js';
import typeValidate from '../validates/type.validate.js';
import { auth } from '../middleware/auth.js';
import { authAdmin } from '../middleware/authAmin.js';

const router = express.Router();

router.post('/add', auth, authAdmin, typeValidate.add, typeController.addType);

router.put('/update/:id', auth, authAdmin, typeValidate.update, typeController.updateType);

router.delete('/delete/:id', auth, authAdmin, typeController.deleteType);

export default router;
