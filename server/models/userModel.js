const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Please enter your username'],
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: [true, 'Please enter your password'],
		},
		email: {
			type: String,
			unique: true,
			require: true,
		},
		name: String,
		district: {
			type: String,
			default: '',
		},
		city: {
			type: String,
			default: '',
		},
		address: {
			type: String,
			default: '',
		},
		mute: {
			type: Boolean,
			default: false,
		},

		phone: String,

		confirmed: {
			type: Boolean,
			default: false,
		},
		type: {
			type: Number,
			default: 0, //0=user  1=admin
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Users', userSchema);
