const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		require: true,
		ref: 'Users',
	},
	productId: String,
	content: String,
	date: Date,
	//parentId: {
	// 	type: String,
	// 	default: '',
	// },
	reply: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Users',
			},
			content: String,
			date: Date,
		},
	],
});

module.exports = mongoose.model('Comments', commentSchema);
