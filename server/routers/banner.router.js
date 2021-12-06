import express from 'express';
import bannerController from '../controllers/banner.controller.js';
import bannerValidate from '../validates/banner.validate.js';
import { auth } from '../middleware/auth.js';
import { authAdmin } from '../middleware/authAmin.js';

const router = express.Router();

router.get('/get', bannerController.getAllBanners);

router.post('/add', auth, authAdmin, bannerValidate.add, bannerController.addBanner);

router.patch('/update', auth, authAdmin, bannerValidate.update, bannerController.updateBanner);

router.delete('/delete/:id', auth, authAdmin, bannerController.deleteBanner);

export default router;
