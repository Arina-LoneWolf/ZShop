require('dotenv').config();
const Users = require('../models/userModel');

const authAdmin = async (req, res, next) => {
	try {
		const user = await Users.findById({
			_id: req.user.id,
		});
		if (user.type === 0)
			return res.status(400).json({ msg: `You don't have permission` });

		next();
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = authAdmin;
