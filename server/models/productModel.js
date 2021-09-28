const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		require: true,
	},
	category: {
		type: String,
		require: true,
	},
	type: {
		type: String,
		require: true,
	},
	price: {
		type: Number,
		require: true,
		default: 0,
	},
	sizes: {
		type: [String],
		trim: true,
		require: true,
	},
	colors: Array,
	discount: {
		type: Number,
		default: 0,
	},
	images: {
		type: Array,
		require: true,
	},
	status: [Number],
	soldQuantity: {
		type: Number,
		default: 0,
	},
	idImages: {
		type: Array,
		default: [],
	},
	quantity: Number,
});

module.exports = mongoose.model('Products', productSchema);
