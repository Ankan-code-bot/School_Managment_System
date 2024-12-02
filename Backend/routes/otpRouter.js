const express = require('express');
const otpRouter = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const user = require('../models/User.model');

const genarateOTP = () => {
  return crypto.randomInt(100000, 999999);
}

otpRouter.post('/get-otp', async (req, res) => {
  const email = req.body.email;
  const userData = await user.findOne({ email: email });
  console.log(userData);

  const otp = genarateOTP();
  const otpExpiry = Date.now() + 5 * 60 * 1000;

  await user.findByIdAndUpdate({ _id: userData._id }, { otp, otpExpiry });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.MAIL_PASS
      }
    })

    const sendOTP = (email, otp) => {
      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: email,
        subject: `Your OTP code`,
        text: `Dear User,
              We received a request to verify your identity. Your one-time password (OTP) is:
              ${otp}
              Please use this code to complete your verification. The OTP will expire in 10 minutes.
              If you did not request this OTP, please ignore this email or contact support.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Failed to send email:', error);
          res.status(500).json({ message: "Failed to send OTP", error: error.message });
        } else {
          console.log('Email sent:', info.response);
          res.status(200).json({ message: "OTP sent successfully." });
        }
      });

    }

    sendOTP(email, otp);
    return res.status(200).json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error("Failed to send OTP", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

module.exports = otpRouter;
