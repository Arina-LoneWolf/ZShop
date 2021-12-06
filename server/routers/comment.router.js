import express from 'express';
import commentController from '../controllers/comment.controller.js';
import commentValidate from '../validates/comment.validate.js';
import { auth } from '../middleware/auth.js';
import { authAdmin } from '../middleware/authAmin.js';

const router = express.Router();

router.get('/get/:productId', commentController.getComment);

router.post('/add', auth, commentValidate.add, commentController.addComment);

router.delete('/delete/:commentId', auth, authAdmin, commentController.deleteComment);

export default router;
