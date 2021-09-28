const router = require('express').Router();
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAmin');

router.get('/home', productController.getProductHomePage);

router.get('/detail/:category', productController.getProductCategory);

router.get('/all', productController.getProductAll);

router.get('/search', productController.searchProduct);

router.get('/get-product/:id', productController.getProductDetail);

router.post('/add', auth, authAdmin, productController.addProduct);

router.put('/update/:id', auth, authAdmin, productController.editProduct);

router.delete('/delete/:id', auth, authAdmin, productController.deleteProduct);

module.exports = router;
