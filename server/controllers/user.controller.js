require('dotenv').config();
const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const nodemailer = require('nodemailer');

const client = new OAuth2(process.env.OAUTH_GOOGLE_CLIENT);

const register = async (req, res) => {
	try {
		const { username, password, name, address, phone, email } = req.body;

		if (!username || !password)
			return res
				.status(400)
				.json({ message: 'Please fill username and password' });

		const user = await Users.findOne({ username });
		const userEmail = await Users.findOne({ email });
		if (user)
			return res.status(400).json({ message: 'This username already exist' });

		if (userEmail)
			return res.status(400).json({ message: 'This email already exist' });

		if (password.length < 6)
			return res
				.status(400)
				.json({ message: 'Password must be at least 6 characters' });

		if (email.length != 0 && !validateEmail(email))
			return res.status(400).json({ message: 'Invalid email' });

		//if (phone.length < 10)
		//return res.status(400).json({ message: 'Phone number too short' });

		const passwordHash = await bcrypt.hash(password, 10);
		const newUser = new Users({
			username,
			password: passwordHash,
			name,
			address,
			phone,
			email,
		});

		const result = await newUser.save();

		//console.log(req.body);
		// const accessToken = createAccessToken({
		// 	id: newUser._id,
		// 	username: newUser.username,
		// 	password: newUser.password,
		// });
		const url = `http://localhost:5000/user/confirm/${newUser._id}`;
		sendMail(email, url);
		res.json({ message: 'Register success' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const sendMail = (to, url) => {
	const smtpTransport = nodemailer.createTransport({
		//service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		ignoreTLS: false,
		secure: false,
		auth: {
			user: process.env.USERNAME_GMAIL,
			pass: process.env.PASS_GMAIL,
		},
	});

	const mailOptions = {
		from: `"ZShop" <${process.env.USERNAME_GMAIL}>`,//process.env.USERNAME_GMAIL,
		to: to,
		subject: 'Confirm Email',
		html: ` <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
		<h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to ZShop.</h2>
		<p>Congratulations! You're almost set to start using ZShop.
			Just click the button below to validate your email address.
		</p>
		
		<a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Verify your account</a>`,
	};

	smtpTransport.sendMail(mailOptions, (err, info) => {
		if (err) {
			//console.log(err);
			return err;
		}
		//console.log(info);
		return info;
	});
};

const sendMailOTP = (to, otp) => {
	const smtpTransport = nodemailer.createTransport({
		//service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		ignoreTLS: false,
		secure: false,
		auth: {
			user: process.env.USERNAME_GMAIL,
			pass: process.env.PASS_GMAIL,
		},
	});

	const mailOptions = {
		from: `"ZShop" <${process.env.USERNAME_GMAIL}>`,
		to: to,
		subject: 'Confirm Email',
		html: ` <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
		<h2 style="text-align: center; text-transform: uppercase;color: teal;">ZShop Messenger.</h2>
		<p>Please enter OTP code</p>
		
		<h2>${otp}</h2>`,
	};

	smtpTransport.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
			return err;
		}
		console.log("info", info);
		return info;
	});
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const user = await Users.findOne({ username });
		if (!user) return res.status(400).json({ message: 'User does not exist' });
		if (!user.confirmed)
			return res.status(400).json({ message: 'Please active account' });
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res
				.status(400)
				.json({ message: 'Incorrect password or username' });

		//if login success
		const accessToken = createAccessToken({ id: user._id });
		//const refresh_token = createRefreshToken({ id: user._id });

		// res.cookie('refresh_token', refresh_token, {
		// 	httpOnly: true,
		// 	path: '/user/refresh-token',
		// });

		res.json({ message: 'Login success', accessToken /*user*/ });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getInfo = async (req, res) => {
	try {
		const user = await Users.findById({ _id: req.user.id }).select('-password');
		if (!user) return res.status(400).json({ message: 'User does not exits' });
		res.json({ message: 'Get info success', user });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const loginGoogle = async (req, res) => {
	//console.log('do login gg');
	const { tokenId } = req.body;
	const verify = await client.verifyIdToken({
		idToken: tokenId,
		audience: process.env.OAUTH_GOOGLE_CLIENT,
	});

	const { email, name, email_verified } = verify.payload;
	//console.log(email_verified);
	if (email_verified) {
		const user = await Users.findOne({ email });
		if (user) {
			const accessToken = createAccessToken({
				id: user._id,
			});
			console.log(user);
			return res.json({
				message: 'Login with gg success',
				accessToken /*user*/,
			});
		}
		const phone = '';
		const address = '';
		const username = name + process.env.REFRESH_TOKEN_SECRET;
		const password = email + process.env.REFRESH_TOKEN_SECRET;
		const passwordHash = await bcrypt.hash(password, 10);
		const newUser = new Users({
			username,
			password: passwordHash,
			name,
			email,
			phone,
			address,
		});

		const result = await newUser.save();
		const accessToken = createAccessToken({
			id: newUser._id,
		});
		res.json({ message: 'Login success', accessToken /*user: newUser*/ });
	}

	//console.log(verify);
};

const confirmMail = async (req, res) => {
	try {
		//console.log(req.params.token);
		await Users.findByIdAndUpdate(
			{ _id: req.params.token },
			{ confirmed: true }
		);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	return res.redirect(process.env.CLIENT_URL);
};

const updateInfo = async (req, res) => {
	try {
		if (req.body.username) {
			return res.status(400).json({ message: 'Do not update username' });
		}

		const userUpdate = await Users.findByIdAndUpdate(
			{ _id: req.user.id },
			req.body,
			{ new: true }
		).select('-password');

		if (userUpdate) {
			res.json({ message: 'Update Info success', user: userUpdate });
		} else {
			res.json({ message: 'Update Info fail' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updatePass = async (req, res) => {
	try {
		const { newPassword, currentPassword } = req.body;
		const user = await Users.findById({ _id: req.user.id });
		const isMatch = await bcrypt.compare(currentPassword, user.password);

		if (!isMatch)
			return res.status(400).json({ message: 'Incorrect password' });

		const passwordHash = await bcrypt.hash(newPassword, 10);
		const userUpdate = await Users.findByIdAndUpdate(
			{ _id: req.user.id },
			{ password: passwordHash },
			{ new: true }
		);

		if (userUpdate) {
			res.json({ message: 'Update Pass success' });
		} else {
			res.json({ message: 'Update Pass fail' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const updateEmail = async (req, res) => {
	try {
		if (req.body.newEmail.length != 0 && !validateEmail(req.body.newEmail))
			return res.status(400).json({ message: 'Invalid email' });

		const checkEmail = await Users.findOne({ email: req.body.newEmail });
		if (checkEmail)
			return res.status(400).json({ message: 'This email already exists' });

		const userUpdate = await Users.findById({ _id: req.user.id });

		if (userUpdate) {
			//req.mail = userUpdate.email;
			const otp = Math.floor(100000 + Math.random() * 900000);
			const newToken = jwt.sign(
				{ id: userUpdate._id, otp, email: req.body.newEmail },
				process.env.REFRESH_TOKEN_SECRET,
				{
					expiresIn: '10m',
				}
			); /*createAccessToken({
				id: userUpdate._id,
				email: req.body.newEmail,
			});*/
			//const url = `http://localhost:5000/user/confirm-update-mail/${newToken}`;
			sendMailOTP(req.body.newEmail, otp);
			res.json({
				message: 'Please check otp in new email (expires in 10m)',
				token: newToken,
				otp,
			});
		} else {
			res.json({ message: 'Update Info fail' });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const confirmUpdateEmail = async (req, res) => {
	try {
		//console.log(req.params.token);
		let verifyUser = {};
		jwt.verify(
			req.body.token,
			process.env.REFRESH_TOKEN_SECRET,
			(error, user) => {
				// if (error) {
				// 	return res.status(401).json({ message: 'token sai' });
				// }

				verifyUser = { ...user };
			}
		);

		console.log(verifyUser.otp);
		console.log(req.body.otp);

		if (req.body.otp !== verifyUser.otp) {
			return res.status(401).json({ message: 'Ma otp sai' });
		}

		const userUpdate = await Users.findByIdAndUpdate(
			{ _id: verifyUser.id },
			{ email: verifyUser.email },
			{ new: true }
		).select('-_id email');

		return res
			.status(200)
			.json({ message: 'Update email success', newEmail: userUpdate.email });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const setMuteUser = async (req, res) => {
	try {
		const user = await Users.findByIdAndUpdate(
			{ _id: req.body.id },
			{ mute: req.body.mute }
		);
		return res.status(200).json({ message: 'Update mute success' });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

// const refreshToken = (req, res) => {
// 	try {
// 		const rf_token = req.cookies.refresh_token;
// 		if (!rf_token) return res.status(400).json({ message: 'Please login' });
// 		jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
// 			if (error) return res.status(400).json({ message: 'Please login' });

// 			const accessToken = createAccessToken({ id: user.id });

// 			res.json({ accessToken });
// 		});
// 	} catch (error) {
// 		return res.status(500).json({ message: error.message });
// 	}

// };

const createAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
};

function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

module.exports = {
	register,
	login,
	getInfo,
	loginGoogle,
	confirmMail,
	confirmUpdateEmail,
	updateInfo,
	updatePass,
	updateEmail,
	setMuteUser,
};
