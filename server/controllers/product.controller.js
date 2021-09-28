require('dotenv').config();
const Products = require('../models/productModel');

class ProductFeatures {
	constructor(listProducts, queryString, totalPage) {
		this.listProducts = listProducts;
		this.queryString = queryString;
		this.totalPage = totalPage;
	}
	filterStatus() {
		const queryObj = { ...this.queryString };
		if (queryObj.status) {
			console.log(queryObj);
			const removeProperties = ['sort', 'limit', 'page', 'type'];
			removeProperties.forEach((e) => delete queryObj[e]);

			if (queryObj.status.length === 1) {
				let oneElement = parseInt(queryObj.status[0]);
				this.listProducts.find({ status: { $all: [oneElement] } });
			} else {
				let a = queryObj.status;
				let manyElements = a.map(Number);
				this.listProducts.find({ status: { $all: manyElements } });
			}
		}

		return this;
	}

	sortPrice() {
		if (this.queryString.sort) {
			console.log(this.queryString.sort);
			this.listProducts.sort(this.queryString.sort);
		}
		return this;
	}
}

const filterStatus = (query) => {
	const queryObj = { ...query };
	if (queryObj.status.length === 1) {
		let oneElement = parseInt(queryObj.status[0]);
		return { status: { $all: [oneElement] } };
	} else {
		let a = queryObj.status;
		let manyElements = a.map(Number);
		return { status: { $all: manyElements } };
	}
};

const getProductHomePage = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const productsAll = await await Products.aggregate([
			{
				$match: {
					$and: [{ status: { $all: [1] } }, { price: { $gt: 0 } }],
				},
			},
		]);
		const totalPage = Math.ceil(productsAll.length / limit);

		const products = await Products.aggregate([
			{
				$match: {
					$and: [{ status: { $all: [1] } }, { price: { $gt: 0 } }],
				},
			},
			{
				$project: {
					_id: 1,
					name: 1,
					category: 1,
					type: 1,
					real_price: {
						$sum: ['$price', 0],
					},
					new_price: {
						$subtract: ['$price', '$discount'],
					},
					discount: 1,
					images: 1,
					colors: 1,
					status: 1,
					sizes: 1,
					discount: 1,
					quantity: 1,
				},
			},
			{ $skip: startIndex },
			{ $limit: limit },
		]);

		res.json({ products, totalPages: totalPage, page: page });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getProductAll = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		const startIndex = (page - 1) * limit;
		// let productFeatures = new ProductFeatures(
		// 	Products.find(
		// 		{ price: { $gt: 0 } },
		// 		{
		// 			_id: 1,
		// 			name: 1,
		// 			category: 1,
		// 			type: 1,
		// 			real_price: {
		// 				$sum: ['$price', 0],
		// 			},
		// 			price: {
		// 				$subtract: ['$price', '$discount'],
		// 			},
		// 			discount: 1,
		// 			images: 1,
		// 			colors: 1,
		// 			status: 1,
		// 			sizes: 1,
		// 			discount: 1,
		// 			quantity: 1,
		// 		}
		// 	),
		// 	req.query,
		// 	0
		// )
		// 	.filterStatus()
		// 	.sortPrice();

		// const products = await productFeatures.listProducts;
		// const totalPage = Math.ceil(products.length / limit);
		// const pageIndex = await productFeatures.listProducts
		// 	.skip(startIndex)
		// 	.limit(limit);
		// console.log('So sp 1 trang:', pageIndex.length);
		// console.log('Tong so sp:', products.length);
		// console.log('Tong so trang:', totalPage);

		let statusQuery = null;
		if (req.query.status) {
			statusQuery = filterStatus(req.query);
		}

		let sortQuery = null;

		const products = await await Products.aggregate([
			{
				$match: {
					$and: [{ price: { $gt: 0 } }, { ...statusQuery }],
				},
			},
		]);
		const totalPage = Math.ceil(products.length / limit);
		let pageIndex = null;
		if (req.query.sort) {
			if (req.query.sort === '1') {
				console.log('Sort tang dan');
				sortQuery = {
					$sort: { new_price: 1 },
				};
			} else {
				console.log('Sort giam dan');
				sortQuery = {
					$sort: { new_price: -1 },
				};
			}
			pageIndex = await Products.aggregate([
				{
					$match: {
						$and: [{ price: { $gt: 0 } }, { ...statusQuery }],
					},
				},
				{
					$project: {
						_id: 1,
						name: 1,
						category: 1,
						type: 1,
						real_price: {
							$sum: ['$price', 0],
						},
						new_price: {
							$subtract: ['$price', '$discount'],
						},
						discount: 1,
						images: 1,
						colors: 1,
						status: 1,
						sizes: 1,
						discount: 1,
						quantity: 1,
					},
				},
				{ ...sortQuery },
				{ $skip: startIndex },
				{ $limit: limit },
			]);
		} else {
			pageIndex = await Products.aggregate([
				{
					$match: {
						$and: [{ price: { $gt: 0 } }, { ...statusQuery }],
					},
				},
				{
					$project: {
						_id: 1,
						name: 1,
						category: 1,
						type: 1,
						real_price: {
							$sum: ['$price', 0],
						},
						new_price: {
							$subtract: ['$price', '$discount'],
						},
						discount: 1,
						images: 1,
						colors: 1,
						status: 1,
						sizes: 1,
						discount: 1,
						quantity: 1,
					},
				},
				{ $skip: startIndex },
				{ $limit: limit },
			]);
		}

		res.json({ products: pageIndex, totalPages: totalPage, page: page });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getProductCategory = async (req, res) => {
	try {
		const category = convertCategory(req.params.category);
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;
		const startIndex = (page - 1) * limit;
		// let productFeatures;
		// if (req.query.type) {
		// 	const type = convertType(req.query.type);
		// 	productFeatures = new ProductFeatures(
		// 		Products.find(
		// 			{ category, type, price: { $gt: 0 } },
		// 			{
		// 				_id: 1,
		// 				name: 1,
		// 				category: 1,
		// 				type: 1,
		// 				real_price: {
		// 					$sum: ['$price', 0],
		// 				},
		// 				price: {
		// 					$subtract: ['$price', '$discount'],
		// 				},
		// 				discount: 1,
		// 				images: 1,
		// 				colors: 1,
		// 				status: 1,
		// 				sizes: 1,
		// 				discount: 1,
		// 				quantity: 1,
		// 			}
		// 		),
		// 		req.query,
		// 		0
		// 	)
		// 		.filterStatus()
		// 		.sortPrice();
		// } else {
		// 	console.log(category);
		// 	productFeatures = new ProductFeatures(
		// 		Products.find(
		// 			{ category: category, price: { $gt: 0 } },
		// 			{
		// 				_id: 1,
		// 				name: 1,
		// 				category: 1,
		// 				type: 1,
		// 				real_price: {
		// 					$sum: ['$price', 0],
		// 				},
		// 				price: {
		// 					$subtract: ['$price', '$discount'],
		// 				},
		// 				discount: 1,
		// 				images: 1,
		// 				colors: 1,
		// 				status: 1,
		// 				sizes: 1,
		// 				discount: 1,
		// 				quantity: 1,
		// 			}
		// 		),
		// 		req.query,
		// 		0
		// 	)
		// 		.filterStatus()
		// 		.sortPrice();
		// }

		// const products = await productFeatures.listProducts;
		// const totalPage = Math.ceil(products.length / limit);
		// let pageIndex = await productFeatures.listProducts
		// 	.skip(startIndex)
		// 	.limit(limit);

		// // if (req.query.sort) {
		// // 	console.log('vao sort');
		// // 	if (req.query.sort === 'price') {
		// // 		console.log('sort 1 giam dan');
		// // 		pageIndex = pageIndex.sort((a, b) => (a.price < b.price ? 1 : -1));
		// // 	} else {
		// // 		console.log('sort -1 tang dan');
		// // 		pageIndex = pageIndex.sort((a, b) => (a.price > b.price ? 1 : -1));
		// // 	}
		// // }

		// console.log('So sp 1 trang:', pageIndex.length);
		// console.log('Tong so sp:', products.length);
		// console.log('Tong so trang:', totalPage);

		// let sortQuery = req.query.sort
		// 	? {
		// 			$sort: { new_price: 1 },
		// 	  }
		// 	: { $sort: { none: 1 } };

		let statusQuery = null;
		if (req.query.status) {
			statusQuery = filterStatus(req.query);
		}

		let sortQuery = null;

		let typeQuery = null;
		if (req.query.type) {
			const type = convertType(req.query.type);
			typeQuery = {
				type: type,
			};
		}

		const products = await await Products.aggregate([
			{
				$match: {
					$and: [
						{ category: category },
						{ price: { $gt: 0 } },
						{ ...statusQuery },
						{ ...typeQuery },
					],
				},
			},
		]);
		const totalPage = Math.ceil(products.length / limit);
		let pageIndex = null;
		if (req.query.sort) {
			if (req.query.sort === '1') {
				console.log('Sort tang dan');
				sortQuery = {
					$sort: { new_price: 1 },
				};
			} else {
				console.log('Sort giam dan');
				sortQuery = {
					$sort: { new_price: -1 },
				};
			}
			pageIndex = await Products.aggregate([
				{
					$match: {
						$and: [
							{ category: category },
							{ price: { $gt: 0 } },
							{ ...statusQuery },
							{ ...typeQuery },
						],
					},
				},
				{
					$project: {
						_id: 1,
						name: 1,
						category: 1,
						type: 1,
						real_price: {
							$sum: ['$price', 0],
						},
						new_price: {
							$subtract: ['$price', '$discount'],
						},
						discount: 1,
						images: 1,
						colors: 1,
						status: 1,
						sizes: 1,
						discount: 1,
						quantity: 1,
					},
				},
				{ ...sortQuery },
				{ $skip: startIndex },
				{ $limit: limit },
			]);
		} else {
			pageIndex = await Products.aggregate([
				{
					$match: {
						$and: [
							{ category: category },
							{ price: { $gt: 0 } },
							{ ...statusQuery },
							{ ...typeQuery },
						],
					},
				},
				{
					$project: {
						_id: 1,
						name: 1,
						category: 1,
						type: 1,
						real_price: {
							$sum: ['$price', 0],
						},
						new_price: {
							$subtract: ['$price', '$discount'],
						},
						discount: 1,
						images: 1,
						colors: 1,
						status: 1,
						sizes: 1,
						discount: 1,
						quantity: 1,
					},
				},
				{ $skip: startIndex },
				{ $limit: limit },
			]);
		}

		res.json({ products: pageIndex, totalPages: totalPage, page: page });
	} catch (error) {
		console.log('Loi');
		return res.status(500).json({ message: error.message });
	}
};

const getProductDetail = async (req, res) => {
	try {
		const product = await Products.findById({ _id: req.params.id });
		res.json(product);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const addProduct = async (req, res) => {
	try {
		//const { name,category,type,price,size,colors,discount,i status, } = req.body;
		if (!req.body.images || req.body.images.length === 0) {
			return res.status(400).json({ message: 'Images length = 0' });
		}

		const newProduct = Products(req.body);
		await newProduct.save();
		res.json(newProduct);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const editProduct = async (req, res) => {
	try {
		if (!req.body.images || req.body.images.length === 0) {
			return res.status(400).json({ message: 'Images length = 0' });
		}
		const productUpdate = await Products.findByIdAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ new: true }
		);

		if (productUpdate) {
			res.json({ message: 'Update product success', product: productUpdate });
		} else {
			res.json({ message: 'Update product fail' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteProduct = async (req, res) => {
	try {
		const productUpdate = await Products.findByIdAndDelete({
			_id: req.params.id,
		});

		if (productUpdate) {
			res.json({ message: 'Delete product success' });
		} else {
			res.json({ message: 'Delete product fail' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const searchProduct = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 10;

		const startIndex = (page - 1) * limit;
		const searchText = req.query.name;
		// const endIndex = page * limit;

		// let productFeatures = new ProductFeatures(
		// 	Products.find(
		// 		{ name: { $regex: searchText, $options: '$i' }, price: { $gt: 0 } },
		// 		{
		// 			_id: 1,
		// 			name: 1,
		// 			category: 1,
		// 			type: 1,
		// 			real_price: {
		// 				$sum: ['$price', 0],
		// 			},
		// 			price: {
		// 				$subtract: ['$price', '$discount'],
		// 			},
		// 			discount: 1,
		// 			images: 1,
		// 			colors: 1,
		// 			status: 1,
		// 			sizes: 1,
		// 			discount: 1,
		// 			quantity: 1,
		// 		}
		// 	),
		// 	req.query,
		// 	0
		// )
		// 	.filterStatus()
		// 	.sortPrice();

		// const products = await productFeatures.listProducts;
		// const totalPage = Math.ceil(products.length / limit);
		// const pageIndex = await productFeatures.listProducts
		// 	.skip(startIndex)
		// 	.limit(limit);
		// console.log('So sp 1 trang:', pageIndex.length);
		// console.log('Tong so sp:', products.length);
		// console.log('Tong so trang:', totalPage);

		// console.log(products.length);

		let statusQuery = null;
		if (req.query.status) {
			statusQuery = filterStatus(req.query);
		}

		let sortQuery = null;

		const products = await await Products.aggregate([
			{
				$match: {
					$and: [
						{ name: { $regex: searchText, $options: '$i' } },
						{ price: { $gt: 0 } },
						{ ...statusQuery },
					],
				},
			},
		]);
		const totalPage = Math.ceil(products.length / limit);
		let pageIndex = null;
		if (req.query.sort) {
			if (req.query.sort === '1') {
				console.log('Sort tang dan');
				sortQuery = {
					$sort: { new_price: 1 },
				};
			} else {
				console.log('Sort giam dan');
				sortQuery = {
					$sort: { new_price: -1 },
				};
			}
			pageIndex = await Products.aggregate([
				{
					$match: {
						$and: [
							{ name: { $regex: searchText, $options: '$i' } },
							{ price: { $gt: 0 } },
							{ ...statusQuery },
						],
					},
				},
				{
					$project: {
						_id: 1,
						name: 1,
						category: 1,
						type: 1,
						real_price: {
							$sum: ['$price', 0],
						},
						new_price: {
							$subtract: ['$price', '$discount'],
						},
						discount: 1,
						images: 1,
						colors: 1,
						status: 1,
						sizes: 1,
						discount: 1,
						quantity: 1,
					},
				},
				{ ...sortQuery },
				{ $skip: startIndex },
				{ $limit: limit },
			]);
		} else {
			pageIndex = await Products.aggregate([
				{
					$match: {
						$and: [
							{ name: { $regex: searchText, $options: '$i' } },
							{ price: { $gt: 0 } },
							{ ...statusQuery },
						],
					},
				},
				{
					$project: {
						_id: 1,
						name: 1,
						category: 1,
						type: 1,
						real_price: {
							$sum: ['$price', 0],
						},
						new_price: {
							$subtract: ['$price', '$discount'],
						},
						discount: 1,
						images: 1,
						colors: 1,
						status: 1,
						sizes: 1,
						discount: 1,
						quantity: 1,
					},
				},
				{ $skip: startIndex },
				{ $limit: limit },
			]);
		}
		res.json({
			products: pageIndex,
			totalPages: totalPage,
			page,
			search: searchText,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const convertType = (x) => {
	switch (JSON.stringify(x)) {
		case JSON.stringify('ao-the-thao'):
			console.log('AOTHETHAO');
			return 'Áo Thể Thao';
		case JSON.stringify('ao-thun-nu'):
			console.log('AOTHUNNU');
			return 'Áo Thun Nữ';
		case JSON.stringify('ao-kieu-nu'):
			console.log('AOKIEUNU');
			return 'Áo Kiểu Nữ';
		case JSON.stringify('ao-so-mi-nu'):
			console.log('AOSOMINU');
			return 'Áo Sơ Mi Nữ';
		case JSON.stringify('ao-khoac-nu'):
			console.log('AOKHOACNU');
			return 'Áo Khoác Nữ';
		case JSON.stringify('quan-dai'):
			console.log('QUANDAI');
			return 'Quần Dài';
		case JSON.stringify('quan-short-nu'):
			console.log('QUANSHORTNU');
			return 'Quần Short Nữ';
		case JSON.stringify('quan-legging'):
			console.log('QUANLEGGING');
			return 'Quần Legging';
		case JSON.stringify('chan-vay'):
			console.log('CHANVAY');
			return 'Chân Váy';
		case JSON.stringify('dam-nu'):
			console.log('DAMNU');
			return 'Đầm Nữ';
		case JSON.stringify('yem'):
			console.log('YEM');
			return 'Yếm';
		default:
			break;
	}
};

const convertCategory = (x) => {
	switch (x.toLowerCase()) {
		case 'dam-vay':
			return 'Đầm Váy';
		case 'ao':
			return 'Áo';
		case 'quan':
			console.log('Vao Quan');
			return 'Quần';
		default:
			break;
	}
};

module.exports = {
	getProductHomePage,
	getProductCategory,
	getProductAll,
	getProductDetail,
	addProduct,
	editProduct,
	deleteProduct,
	searchProduct,
};
