const { json } = require('body-parser');
const Orders = require('../models/orderModel');
const Products = require('../models/productModel');

const getOrder = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		let queryObj = {
			user: req.params.id,
		};
		// if (Object.values(req.body).length !== 0) {
		// 	if (req.body.timeStart && req.body.timeEnd) {
		// 		console.log('co time');
		// 		queryObj = {
		// 			user: req.params.id,
		// 			status: req.body.status,
		// 			date: {
		// 				$gte: new Date(req.body.timeStart),
		// 				$lte: new Date(req.body.timeEnd),
		// 			},
		// 		};
		// 	} else {
		// 		console.log('khong time');
		// 		queryObj = {
		// 			user: req.params.id,
		// 			status: req.body.status,
		// 		};
		// 	}
		// }
		console.log(queryObj);
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		let countOrders = await Orders.countDocuments(queryObj);
		countOrders = Math.ceil(countOrders / limit);
		const orders = await Orders.find(queryObj)
			.populate({
				path: 'user',
				select: 'name type district city address phone email',
			})
			.sort({ date: -1 })
			.skip(startIndex)
			.limit(limit);

		if (orders)
			res.json({
				message: 'Get order done',
				orders,
				totalPages: countOrders,
				page: page,
			});
		else res.json({ message: 'Get order failed' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getAllOrders = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		let queryObj = null;
		if (Object.values(req.body).length !== 0) {
			if (req.body.timeStart && req.body.timeEnd) {
				if (req.body.status) {
					console.log('co time va co status');
					queryObj = {
						status: req.body.status,
						date: {
							$gte: new Date(req.body.timeStart),
							$lte: new Date(`${req.body.timeEnd}T23:59:59`),
						},
					};
				} else {
					console.log('co time va ko co status');
					queryObj = {
						date: {
							$gte: new Date(req.body.timeStart),
							$lte: new Date(`${req.body.timeEnd}T23:59:59`),
						},
					};
				}
			} else {
				console.log('co status khong co time');
				queryObj = {
					status: req.body.status,
				};
			}
		}

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		console.log(new Date(req.body.timeStart));
		console.log(new Date(req.body.timeEnd));

		let countOrders = await Orders.countDocuments(queryObj);
		console.log('tong so hoa don', countOrders);
		countOrders = Math.ceil(countOrders / limit);
		const orders = await Orders.find(queryObj)
			.populate({
				path: 'user',
				select: 'name type district city address phone email',
			})
			.sort({ date: -1 })
			.skip(startIndex)
			.limit(limit);

		if (orders)
			res.json({
				message: 'Get all order done',
				orders,
				totalPages: countOrders,
				page: page,
			});
		else res.json({ message: 'Get all order failed' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const addOrder = async (req, res) => {
	try {
		const { user, products, receiverInfo, paymentMethod } = req.body;

		let total = 0;
		let productError = [];
		products.forEach((e) => {
			if (e.status.includes(2)) {
				total += (e.price - e.discount) * e.soldQuantity;
			} else {
				total += e.price * e.soldQuantity;
			}
		});

		for (let i = 0; i < products.length; i++) {
			const oneProduct = await Products.findById({ _id: products[i]._id });
			if (oneProduct.quantity < products[i].soldQuantity) {
				let objectInfoError = {
					id: oneProduct._id,
					name: oneProduct.name,
					quantity: oneProduct.quantity,
				};
				productError.push(
					objectInfoError
					// `Số lượng còn lại của ${oneProduct.name} là ${oneProduct.quantity}`
				);
			}
		}

		if (productError.length !== 0) {
			return res.status(400).json({ error: productError });
		}

		for (let i = 0; i < products.length; i++) {
			await Products.findByIdAndUpdate(
				{ _id: products[i]._id },
				{
					$inc: {
						quantity: -products[i].soldQuantity,
						soldQuantity: products[i].soldQuantity,
					},
					// $set: {
					// 	quantity: {
					// 		$cond: [
					// 			{ $lte: ['$quantity', 0] },
					// 			{ $sum: ['$quantity', products[i].soldQuantity] },
					// 			{ $subtract: ['$quantity', products[i].soldQuantity] },
					// 		],
					// 	},
					// },
				}
				// (err, data) => {
				// 	if (err) return;
				// 	if (data.quantity < 0) {
				// 		console.log('Quantity < 0');
				// 		productError.push(`${data.name} sold out`);
				// 	}
				// }
			);
		}
		let timeNow = new Date();
		let timeAddGMT = new Date(timeNow.getTime() + -timeNow.getTimezoneOffset() * 60000);
		let idOrder = new Date().valueOf().toString().substring(6, 13);
		const newOrder = new Orders({
			user,
			idOrder,
			products,
			date: timeAddGMT,//new Date(),
			total,
			receiverInfo,
			paymentMethod,
		});

		//if (productError.length === 0) {
		await newOrder.save();
		res.json({ message: 'Order add success' });
		//} else {
		//res.json({ message: productError });
		//}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateOrder = async (req, res) => {
	try {
		const order = await Orders.findByIdAndUpdate(
			{ _id: req.body.id },
			{ status: req.body.status },
			{ new: true }
		);

		if (req.body.status === 4) {
			const productOrder = order.products;
			console.log(productOrder.length);

			for (let i = 0; i < productOrder.length; i++) {
				await Products.findByIdAndUpdate(
					{ _id: productOrder[i]._id },
					{
						$inc: {
							quantity: productOrder[i].soldQuantity,
							soldQuantity: -productOrder[i].soldQuantity,
						},
					}
				);
			}
		}

		res.json({ message: 'Update order done', order });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const searchOrder = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		const searchText = req.query.q;

		let queryObj = {
			$or: [
				{ idOrder: { $regex: searchText, $options: '$i' } },
				{ 'receiverInfo.name': { $regex: searchText, $options: '$i' } },
				{ 'receiverInfo.phone': { $regex: searchText, $options: '$i' } },
			],
		};
		if (Object.values(req.body).length !== 0) {
			if (req.body.timeStart && req.body.timeEnd) {
				console.log('co time');
				queryObj = {
					...queryObj,
					status: req.body.status,
					date: {
						$gte: new Date(req.body.timeStart),
						$lte: new Date(req.body.timeEnd),
					},
				};
			} else {
				console.log('khong time');
				queryObj = {
					...queryObj,
					status: req.body.status,
				};
			}
		}

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		console.log(req.body.timeStart);

		let countOrders = await Orders.countDocuments(queryObj);
		countOrders = Math.ceil(countOrders / limit);
		const orders = await Orders.find(queryObj)
			.populate({
				path: 'user',
				select: 'name type district city address phone email',
			})
			.sort({ date: -1 })
			.skip(startIndex)
			.limit(limit);

		if (orders)
			res.json({
				orders,
				totalPages: countOrders,
				page: page,
				search: searchText,
			});
		else res.json({ message: 'Loi' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getTotalOneMonth = async (req, res) => {
	try {
		//let month = 5;

		let a = Date.now();
		let b = new Date(a);
		let dataTotal = [];
		//console.log(b.getFullYear());
		for (let i = 1; i <= 12; i++) {
			const allPrice = await Orders.aggregate([
				{
					$match: {
						$and: [
							{
								status: 3,
							},
							{
								date: {
									$gte: new Date(`2021-${i}`),
									$lt: new Date(`2021-${i + 1}`),
								},
							},
						],
						// date: {
						// 	$gte: new Date(`2021-${i}`),
						// 	$lt: new Date(`2021-${i + 1}`),
						// },
					},
				},
				{
					$group: {
						_id: {
							year: { $year: '$date' },
							month: { $month: '$date' },
						},
						total: { $sum: '$total' },
					},
				},
				{
					$project: {
						_id: 0,
						total: 1,
						month: { $sum: [i, 0] },
					},
				},
			]);

			if (allPrice.length !== 0) {
				dataTotal.push(allPrice[0]);
			} else {
				let fakeResult = {
					total: 0,
					month: i,
				};
				dataTotal.push(fakeResult);
			}
		}
		console.log(dataTotal);

		res.json({ message: 'Done', data: dataTotal });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getTotalCategory = async (req, res) => {
	try {
		const allPrice = await Orders.aggregate([
			{
				$match: {
					status: 3,
				},
			},
			{
				$unwind: '$products',
			},
		]);

		let result = [];
		let totalAo = 0;
		let totalQuan = 0;
		let totalDamVay = 0;
		for (let i = 0; i < allPrice.length; i++) {
			let product = allPrice[i].products;

			if (JSON.stringify(product.category) === JSON.stringify('Áo')) {
				if (product.status.includes(2))
					totalAo += (product.price - product.discount) * product.soldQuantity;
				else {
					totalAo += product.price * product.soldQuantity;
				}
			}
			if (JSON.stringify(product.category) === JSON.stringify('Quần')) {
				if (product.status.includes(2))
					totalQuan +=
						(product.price - product.discount) * product.soldQuantity;
				else {
					totalQuan += product.price * product.soldQuantity;
				}
			}

			if (product.category === 'Đầm Váy') {
				if (product.status.includes(2))
					totalDamVay +=
						(product.price - product.discount) * product.soldQuantity;
				else {
					totalDamVay += product.price * product.soldQuantity;
				}
			}
		}

		result.push({ category: 'Áo', total: totalAo });
		result.push({ category: 'Quần', total: totalQuan });
		result.push({ category: 'Đầm Váy', total: totalDamVay });
		//console.log(totalQuan);

		res.json({ result });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getNumberSoldCategory = async (req, res) => {
	try {
		const allPrice = await Orders.aggregate([
			{
				$match: {
					status: 3,
				},
			},
			{
				$unwind: '$products',
			},
		]);

		let result = [];
		let totalAo = 0;
		let totalQuan = 0;
		let totalDamVay = 0;
		for (let i = 0; i < allPrice.length; i++) {
			let product = allPrice[i].products;

			if (JSON.stringify(product.category) === JSON.stringify('Áo')) {
				totalAo += product.soldQuantity;
			}
			if (JSON.stringify(product.category) === JSON.stringify('Quần')) {
				totalQuan += product.soldQuantity;
			}
			if (product.category === 'Đầm Váy') {
				totalDamVay += product.soldQuantity;
			}
		}

		result.push({ category: 'Áo', total: totalAo });
		result.push({ category: 'Quần', total: totalQuan });
		result.push({ category: 'Đầm Váy', total: totalDamVay });
		//console.log(totalQuan);

		res.json({ result });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getNumberSoldCategoryFollowMonth = async (req, res) => {
	try {
		let data = [];
		for (let i = 1; i <= 12; i++) {
			const allPrice = await Orders.aggregate([
				{
					$match: {
						$and: [
							{
								status: 3,
							},
							{
								date: {
									$gte: new Date(`2021-${i}`),
									$lt: new Date(`2021-${i + 1}`),
								},
							},
						],
					},
				},
				{
					$unwind: '$products',
				},
			]);

			//let result = [];
			let totalAo = 0;
			let totalQuan = 0;
			let totalDamVay = 0;
			for (let i = 0; i < allPrice.length; i++) {
				let product = allPrice[i].products;

				if (JSON.stringify(product.category) === JSON.stringify('Áo')) {
					totalAo += product.soldQuantity;
				}
				if (JSON.stringify(product.category) === JSON.stringify('Quần')) {
					totalQuan += product.soldQuantity;
				}
				if (product.category === 'Đầm Váy') {
					totalDamVay += product.soldQuantity;
				}
			}

			let objectOneMonthSold = {
				Ao: totalAo, //{ category: 'Áo', total:  },
				Quan: totalQuan, // { category: 'Quần', total:  },
				DamVay: totalDamVay, //{ category: 'Đầm Váy', total: totalDamVay },
				Month: i,
			};
			data.push(objectOneMonthSold);
		}

		//result.push({ category: 'Áo', total: totalAo });
		//result.push({ category: 'Quần', total: totalQuan });
		//result.push({ category: 'Đầm Váy', total: totalDamVay });
		//console.log(totalQuan);

		res.json({ data });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getOrder,
	getAllOrders,
	addOrder,
	updateOrder,
	getTotalOneMonth,
	getTotalCategory,
	getNumberSoldCategory,
	getNumberSoldCategoryFollowMonth,
	searchOrder,
};
