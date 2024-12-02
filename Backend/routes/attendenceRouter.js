const express = require('express');
const authentication = require('../Authentication/auth');
const Attendance = require('../models/attendance.model');
const user = require('../models/User.model');
const Class = require('../models/class.model');
const attandanceRouter = express.Router();

attandanceRouter.post('/add-new-attendance', authentication, async (req, res) => {
  try {
    const { className } = req.body;
    const ClassDetails = await Class.findOne({ name: className });
    if (!ClassDetails) {
      return res.status(404).json({ message: "No classes are present with this name." });
    }
    const today = new Date().toISOString().split('T')[0];
    const existingAttendance = await Attendance.findOne({
      className: ClassDetails._id,
      date: today,
    });

    if (existingAttendance) {
      return res.status(200).json({
        message: "Attendance sheet already exists for this class today.",
        attendId: existingAttendance._id,
      });
    } else {
      const newAttendance = new Attendance({
        className: ClassDetails._id,
      });

      await newAttendance.save();

      return res.status(200).json({
        message: "New attendance sheet created successfully.",
        attendId: newAttendance._id,
      });
    }

  } catch (error) {
    console.error("Error creating attendance sheet:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});


attandanceRouter.put('/make-attendance/:id', authentication, async (req, res) => {
  try {
    const studentId = req.params.id;
    const { attendId } = req.body;

    if (!studentId || !attendId) {
      return res.status(400).json({ message: "Student ID and Attendance ID are required." });
    }


    const updatedStudent = await user.findByIdAndUpdate(
      studentId,
      { $addToSet: { attendance: attendId } },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found." });
    }

    const attendanceRecord = await Attendance.findOne({
      _id: attendId,
      "records.student": studentId,
    });

    if (attendanceRecord) {
      return res.status(200).json({ message: "Student is already marked present for this attendance." });
    }

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      attendId,
      { $addToSet: { records: { student: studentId, status: "Present" } } },
      { new: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ message: "Attendance record not found." });
    }

    return res.status(200).json({
      message: "Attendance recorded successfully.",
      updatedAttendance,
    });
  } catch (error) {
    console.error("Error recording attendance:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});




attandanceRouter.get('/attendance-details/:id', authentication, async (req, res) => {
  try {
    const attendId = req.params.id;
    const attendaceDetails = await Attendance.findById(attendId);
    return res.status(200).json({ attendaceDetails });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error." });
  }
});



attandanceRouter.post('/get-all-attendace', authentication, async (req, res) => {
  try {
    const className = req.body.className;
    const allattendDetails = await Attendance.find({ className: className });
    return res.status(200).json({ allattendDetails });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server erorr." });
  }
});

module.exports = attandanceRouter;