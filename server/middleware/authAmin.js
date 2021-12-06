import User from '../services/user.service.js';

const authAdmin = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await User.getInfo(id);

    if (user[0].isAdmin === 0) return res.status(400).json({ msg: `You don't have permission` });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export { authAdmin };
