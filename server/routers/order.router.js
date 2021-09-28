const router = require('express').Router();
const orderController = require('../controllers/order.controller');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAmin');

router.post('/add', auth, orderController.addOrder);

router.get('/get-by-user/:id', auth, orderController.getOrder);

router.post('/get-all', auth, authAdmin, orderController.getAllOrders);

router.get('/search', orderController.searchOrder);

router.patch('/update', auth, authAdmin, orderController.updateOrder);

router.get(
	'/gettotalonemonth',
	auth,
	authAdmin,
	orderController.getTotalOneMonth
);

router.get(
	'/gettotalcategory',
	auth,
	authAdmin,
	orderController.getTotalCategory
);

router.get(
	'/gettotalsoldcategory',
	auth,
	authAdmin,
	orderController.getNumberSoldCategory
);

router.get(
	'/gettotalsoldcategory-followmonth',
	auth,
	authAdmin,
	orderController.getNumberSoldCategoryFollowMonth
);

module.exports = router;
