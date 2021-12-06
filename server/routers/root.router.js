import express from 'express';
import userRouter from './user.router.js';
import productRouter from './product.router.js';
import commentRouter from './comment.router.js';
import categoryRouter from './category.router.js';
import typeRouter from './type.router.js';
import cartRouter from './cart.router.js';
import orderRouter from './order.router.js';
import bannerRouter from './banner.router.js';
import imageRouter from './image.router.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/comment', commentRouter);
router.use('/category', categoryRouter);
router.use('/type', typeRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.use('/banner', bannerRouter);
router.use('/image', imageRouter);

export default router;
