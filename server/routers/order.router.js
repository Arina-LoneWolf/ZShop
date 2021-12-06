import express from 'express';
import orderController from '../controllers/order.controller.js';
import { auth } from '../middleware/auth.js';
import { authAdmin } from '../middleware/authAmin.js';

const router = express.Router();

router.get('/gettotalonemonth/:year', auth, authAdmin, orderController.getRevenue);

router.get('/get-by-user/:id', auth, orderController.getOrders);

router.get('/search', orderController.searchOrder);

router.get(
  '/gettotalsoldcategory-followmonth/:year',
  auth,
  authAdmin,
  orderController.getNumberSoldCategoryFollowMonth
);

router.get(
  '/gettotalcategoryonemonth/:month',
  auth,
  authAdmin,
  orderController.getTotalAllCategoryOneMonth
);

router.get(
  '/getsalecategoryonemonth/:month',
  auth,
  authAdmin,
  orderController.getSaleAllCategoryOneMonth
);

router.get(
  '/getsaleonecategoryallmonths/:category',
  auth,
  authAdmin,
  orderController.getSaleOneCategoryAllMonths
);

router.post('/add', auth, orderController.addOrder);

router.post('/get-all', auth, authAdmin, orderController.getAllOrders);

router.patch('/update', auth, authAdmin, orderController.updateOrder);

export default router;
