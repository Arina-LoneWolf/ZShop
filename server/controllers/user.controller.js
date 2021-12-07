import User from '../services/user.service.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail, sendMailOTP } from '../helpers/mail.helper.js';
import { google } from 'googleapis';

const client = new google.auth.OAuth2(process.env.OAUTH_GOOGLE_CLIENT);

const register = async (req, res) => {
  try {
    const { username, password, name, email } = req.body;

    const checkUsernameAndEmail = await User.checkUsernameAndEmail([username, email]);

    if (checkUsernameAndEmail.length !== 0)
      return res.status(400).json({ message: 'Duplicate username or email' });

    const hashPassword = await bcrypt.hash(password, 10);
    //Object.values(validateReqBody);
    await User.register([name, username, hashPassword, email]);

    const token = jwt.sign(
      {
        email,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    const url = `http://localhost:5000/api/user/confirm/${token}`;

    sendMail(email, url);

    return res.status(201).json({ message: 'Register success' });
  } catch (error) {
    //if (error.isJoi) return res.status(400).json(error.details);
    return res.status(500).json(error);
  }
};

// const sendMail = async (to, url) => {
//   // const smtpTransport = nodemailer.createTransport({
//   //   service: 'gmail',
//   //   auth: {
//   //     user: process.env.USERNAME_GMAIL,
//   //     pass: process.env.PASS_GMAIL,
//   //   },
//   // });

//   const accessToken = await oAuth2Client.getAccessToken();
//   const smtpTransport = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       type: 'OAuth2',
//       user: process.env.USERNAME_GMAIL,
//       clientId: CLIENT_ID,
//       clientSecret: CLIENT_SECRET,
//       refreshToken: REFRESH_TOKEN_MAIL,
//       accessToken: accessToken,
//     },
//   });

//   const mailOptions = {
//     from: `ZShopAdmin ${process.env.USERNAME_GMAIL}`,
//     to: to,
//     subject: 'Confirm Email',
//     html: ` <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
// 		<h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to ZShop.</h2>
// 		<p>Congratulations! You're almost set to start using ZShop.
// 			Just click the button below to validate your email address.
// 		</p>

// 		<a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Verify your account</a>`,
//   };

//   smtpTransport.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(info);
//   });
// };

const confirmMail = async (req, res) => {
  try {
    let email = null;
    jwt.verify(req.params.token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(403).json({ message: 'Wrong token' });
      }
      email = user.email;
    });
    await User.updateConfirmed([1, email]);
  } catch (error) {
    res.status(500).json(error);
  }
  return res.redirect('http://localhost:3000');
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const resultSelectLogin = await User.selectLogin([username]);
    if (resultSelectLogin.length === 0)
      return res.status(400).json({ message: 'Wrong username or passowrd' });

    if (resultSelectLogin[0].confirmed === 0) {
      return res.status(400).json({ message: 'Please active account' });
    }

    const isMatchPassword = await bcrypt.compare(password, resultSelectLogin[0].password);
    if (!isMatchPassword) {
      return res.status(400).json({ message: 'Wrong username or passowrd' });
    }

    const accessToken = jwt.sign({ id: resultSelectLogin[0].id }, process.env.ACCESS_TOKEN_SECRET);

    res.status(200).json({ message: 'Login success', accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getInfo = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.getInfo(id);

    return res.status(200).json({ message: 'Get info success', user: user[0] });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateInfo = async (req, res) => {
  try {
    const id = req.user.id;
    if (
      req.body.username ||
      req.body.password ||
      req.body.mute ||
      req.body.confirmed ||
      req.body.isAdmin ||
      req.body.email
    ) {
      return res.status(400).json({ message: 'Update info fail' });
    }

    const data = [req.body, id];

    await User.updateInfo(data);
    const user = await User.getInfo(id);
    return res.status(200).json({ message: 'Update info success', user });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePass = async (req, res) => {
  try {
    const id = req.user.id;
    const { newPassword, currentPassword } = req.body;
    let password = await User.getPassword(id);
    const isMatch = await bcrypt.compare(currentPassword, password[0].PASSWORD);

    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });
    //password[0].PASSWORD;

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await User.updatePassword(passwordHash, id);

    return res.status(200).json({ message: 'Update password success' });
  } catch (error) {
    res.status(500).json(error);
  }
};

const setMuteUser = async (req, res) => {
  try {
    const { mute, id } = req.body;
    await User.updateMute(mute, id);
    return res.status(200).json({ message: 'Update mute success' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateEmail = async (req, res) => {
  try {
    const { newEmail } = req.body;
    const id = req.user.id;
    const checkEmail = await User.getIdByEmail(newEmail);
    if (checkEmail.length > 1) {
      return res.status(400).json({ message: 'This email already exists' });
    }
    const user = await User.getInfo(id);
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const newToken = jwt.sign({ id, otp, email: newEmail }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10m',
      });
      sendMailOTP(newEmail, otp);
      return res.json({
        message: 'Please check otp in new email (expires in 10m)',
        token: newToken,
        otp,
      });
    } else {
      return res.status(400).json({ message: 'Update email failed' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const confirmUpdateEmail = async (req, res) => {
  try {
    const { token, otp } = req.body;
    let verifyUser = {};
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error) {
        verifyUser = {};
      }

      verifyUser = { ...user };
    });

    if (parseInt(otp) !== verifyUser.otp) {
      return res.status(401).json({ message: 'Invalid otp' });
    }
    await User.updateEmail(verifyUser.email, verifyUser.id);
    return res.status(200).json({ message: 'Update email success', newEmail: verifyUser.email });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginGoogle = async (req, res) => {
  try {
    const { tokenId } = req.body;
    const verify = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.OAUTH_GOOGLE_CLIENT,
    });

    const { email, name, email_verified } = verify.payload;

    if (email_verified) {
      let checkEmail = null;
      checkEmail = await User.getIdByEmail(email);

      if (checkEmail !== null && checkEmail.length === 1) {
        const accessToken = jwt.sign({ id: checkEmail[0].id }, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({
          message: 'Login with gg success',
          accessToken,
        });
      }

      const username = name + Date.now();
      const password = email + Date.now();
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await User.register([name, username, hashPassword, email]);

      //console.log('newUser', newUser.insertId)
      const accessToken = jwt.sign({ id: newUser.insertId }, process.env.ACCESS_TOKEN_SECRET);
      return res.status(201).json({ message: 'Login with gg success', accessToken });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default {
  register,
  confirmMail,
  login,
  getInfo,
  updateInfo,
  updatePass,
  updateEmail,
  setMuteUser,
  confirmUpdateEmail,
  loginGoogle,
};
