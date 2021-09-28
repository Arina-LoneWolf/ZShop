const mongoose = require('mongoose');

const URI =
	'mongodb+srv://bokool123:01286664220asd@cluster0.k514c.mongodb.net/web_ban_hang?retryWrites=true&w=majority';
const connectDB = mongoose.connect(
	URI,
	{
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) throw err;
		console.log('Connect to mongoDB');
	}
);

module.exports = { connectDB };
