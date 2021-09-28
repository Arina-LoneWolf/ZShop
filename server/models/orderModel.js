const mongoose = require('mongoose');
const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			require: true,
			ref: 'Users',
		},
		idOrder: {
			type: String,
			require: true,
		},
		status: {
			type: Number,
			default: 0,
		},
		shipFee: {
			type: Number,
			default: 25000,
		},
		total: {
			type: Number,
			default: 0,
		},
		date: Date,
		products: [
			{
				_id: String,
				name: { type: String, require: true },
				category: { type: String, require: true },
				type: { type: String, require: true },
				price: { type: Number, require: true },
				size:String,
				color: String,
				discount: Number,
				status: [Number],
				soldQuantity: Number,
			},
		],
		receiverInfo: {
			name: String,
			email: String,
			phone: String,
			address: String,
			note: String,
		},
		paymentMethod: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Orders', orderSchema);
