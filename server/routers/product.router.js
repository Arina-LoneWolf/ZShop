import express from 'express';
import productController from '../controllers/product.controller.js';
import productValidate from '../validates/product.validate.js';
import { auth } from '../middleware/auth.js';
import { authAdmin } from '../middleware/authAmin.js';

const router = express.Router();

router.get('/home', productController.getProductHome);

router.get('/all', productController.getAllProducts);

router.get('/detail/:id', productController.getProductDetail);

router.get('/product-category/:category', productController.getProductCategory);

router.get('/search', productController.searchProduct);

router.post('/add', auth, authAdmin, productValidate.add, productController.addProduct);

router.put('/update/:id', auth, authAdmin, productValidate.edit, productController.editProduct);

router.delete('/delete/:id', auth, authAdmin, productController.deleteProduct);

export default router;
