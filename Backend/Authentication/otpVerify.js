const user = require("../models/User.model");

const otpVerify = async (req, res, next) => {
  try {
    const otp = req.body.otp;
    const email = req.body.email;
    const userData = await user.findOne({ email: email });

    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }

    if (userData.otp.toString() !== otp.toString()) {
      return res.status(400).json({ message: "Incorrect OTP. Please try again." });
    }
    return next();
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({ message: "Server error. Please try again later." });

  }

}

module.exports = otpVerify;