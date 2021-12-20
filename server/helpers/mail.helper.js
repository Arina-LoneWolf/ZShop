// import { google } from 'googleapis';
import nodemailer from 'nodemailer';

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URL = process.env.REDIRECT_URL;
// const REFRESH_TOKEN_MAIL = process.env.REFRESH_TOKEN_MAIL;

// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN_MAIL });

const sendMail = async (to, url) => {
  // const accessToken = await oAuth2Client.getAccessToken();
  // const smtpTransport = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAuth2',
  //     user: process.env.USERNAME_GMAIL,
  //     clientId: CLIENT_ID,
  //     clientSecret: CLIENT_SECRET,
  //     refreshToken: REFRESH_TOKEN_MAIL,
  //     accessToken: accessToken,
  //   },
  // });
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USERNAME_GMAIL,
      pass: process.env.PASS_GMAIL,
    },
  });

  const mailOptions = {
    from: `ZShopAdmin ${process.env.USERNAME_GMAIL}`,
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
      console.log(err);
    }
    console.log(info);
  });
};

const sendMailOTP = async (to, otp) => {
  // const accessToken = await oAuth2Client.getAccessToken();
  // const smtpTransport = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     type: 'OAuth2',
  //     user: process.env.USERNAME_GMAIL,
  //     clientId: CLIENT_ID,
  //     clientSecret: CLIENT_SECRET,
  //     refreshToken: REFRESH_TOKEN_MAIL,
  //     accessToken: accessToken,
  //   },
  // });
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USERNAME_GMAIL,
      pass: process.env.PASS_GMAIL,
    },
  });

  const mailOptions = {
    from: `ZShopAdmin ${process.env.USERNAME_GMAIL}`,
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
    }
    console.log(info);
  });
};

export { sendMail, sendMailOTP };
