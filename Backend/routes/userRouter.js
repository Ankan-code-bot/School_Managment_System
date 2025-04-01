const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Class = require('../models/class.model');
const authentication = require('../Authentication/auth');
const otpVerify = require('../Authentication/otpVerify');
const userRouter = express.Router();
const fs = require('fs');
const multer = require('multer');
const user = require('../models/User.model');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_API_KEY
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Upload');
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


userRouter.post('/sign-up', async (req, res) => {
  try {
    const { className, name, email, password, role, address, mobileNo } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Name, email, password, and role are required fields." });
    }

    let classId = null;

    if (className) {
      let existingClass = await Class.findOne({ name: className });
      if (!existingClass) {
        const newClass = new Class({ name: className });
        const savedClass = await newClass.save();
        classId = savedClass._id;
      } else {
        classId = existingClass._id;
      }
    }

    if (password.length < 5) {
      return res.status(400).json({ message: 'Password must be at least 5 characters.' });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new user({
      name,
      email,
      password: hashPass,
      role,
      className: classId,
      address,
      mobileNo
    });

    await newUser.save();
    if (role === "Student" && classId) {
      await Class.findByIdAndUpdate(classId, { $push: { student: newUser._id } }, { new: true });
    }
    return res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Internal Server Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


userRouter.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;
    const findUser = await user.findOne({ name });
    if (!findUser) {
      return res.status(400).json({ message: 'Username or Password is not correct.' });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Username or Password is not correct.' });
    }

    const token = await jwt.sign(
      {
        userId: findUser._id,
        role: findUser.role,
        email: findUser.email,
      },
      process.env.SECRET_KEY
    );

    await res.cookie('token', token, {
      httpOnly: true,
    });


    return res.status(200).json({
      message: 'Login Successfully!',
      userId: findUser._id,
      role: findUser.role,
    });
  } catch (error) {
    console.error("Internal Server Error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



userRouter.get('/user-details',authentication, async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(req.user.email);

    const userInfo = await user.findOne({ _id: userId });
    return res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
    console.log(error);
  }

});

userRouter.put('/update-info', authentication, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, address, mobileNo } = req.body;
    await user.findByIdAndUpdate({ _id: userId }, { name, address, mobileNo }, { new: true });
    return res.status(200).json({ message: "Updated Successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
    console.log(error);
  }

});


userRouter.put('/forgot-password', otpVerify, async (req, res) => {
  try {
    const newPass = req.body.newPass;
    const email = req.body.email;
    const hashPass = await bcrypt.hash(newPass, 10);
    await user.findOneAndUpdate({ email: email }, { password: hashPass }, { new: true });
    return res.status(200).json({ message: "Password Changed Successfully." })
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
    console.log(error);
  }
});


userRouter.delete('/delete-user', async (req, res) => {
  try {
    const { userId } = req.body;
    await user.findByIdAndDelete(userId);
    return res.status(200).json({ message: "User Deleted Successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
    console.log(error);
  }
});

userRouter.delete('/delete-profile', authentication, async (req, res) => {
  try {
    const userId = req.user.userId;
    await user.findByIdAndDelete(userId);
    return res.status(200).json({ message: "User Deleted Successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
    console.log(error);
  }
});


userRouter.get('/get-all-user/:class', authentication, async (req, res) => {
  try {
    const { class: className } = req.params;
    if (!className) {
      return res.status(400).json({ message: "Class name is required." });
    }

    const classData = await Class.findOne({ name: className });
    if (!classData) {
      return res.status(404).json({ message: `Class ${className} not found.` });
    }
    const allUser = await user.find({ className: classData._id, role: "Student" });
    if (allUser.length === 0) {
      return res.status(404).json({ message: "No users found for the specified class." });
    }
    return res.status(200).json({ allUser });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


userRouter.post('/change-image', authentication, upload.single('myFile'), async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    console.log(uploadResult);

    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully.");
      }
    });
    const userId = req.user.userId;
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { avater: uploadResult.secure_url },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.status(200).json({
      message: "Profile picture changed successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
});


module.exports = userRouter;
