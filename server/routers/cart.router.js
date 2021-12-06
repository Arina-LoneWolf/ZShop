import express from 'express';
import cartController from '../controllers/cart.controller.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.get('/get/:id', auth, cartController.getAllProductsInCart);

router.post('/add', auth, cartController.addProductToCart);

router.patch('/update/:id', auth, cartController.updateQuantityProduct);

router.delete('/delete/:id', auth, cartController.deleteProductInCart);

export default router;
