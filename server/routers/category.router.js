import express from 'express';
import categoryController from '../controllers/category.controller.js';
import categoryValidate from '../validates/category.validate.js';
import { auth } from '../middleware/auth.js';
import { authAdmin } from '../middleware/authAmin.js';

const router = express.Router();

router.get('/getAll', categoryController.getAllCategory);

router.post('/add', auth, authAdmin, categoryValidate.add, categoryController.addCategory);

router.put(
  '/update/:id',
  auth,
  authAdmin,
  categoryValidate.update,
  categoryController.updateCategory
);

router.delete('/delete/:id', auth, authAdmin, categoryController.deleteCategory);

export default router;
