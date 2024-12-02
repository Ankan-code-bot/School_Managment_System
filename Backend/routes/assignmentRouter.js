const express = require('express');
const authentication = require('../Authentication/auth');
const Assignment = require('../models/assignment.model');
const Class = require('../models/class.model');
const user = require('../models/User.model');
const assignmentRouter = express.Router();

assignmentRouter.post('/add-assignment', authentication, async (req, res) => {
  try {
    const { title, desc, subject, deadline, className } = req.body;

    const existClass = await Class.findOne({ name: className });
    if (!existClass) {
      return res.status(400).json({ message: "Class not found!" });
    }

    const newAssignment = new Assignment({
      title,
      desc,
      subject,
      deadline,
      className: existClass._id,
    });

    await newAssignment.save();
    await Class.findByIdAndUpdate(existClass._id, { $push: { assignment: newAssignment._id } });

    return res.status(200).json({ message: "New Assignment added successfully." });
  } catch (error) {
    console.error("Error adding assignment:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

assignmentRouter.get('/get-assignment', authentication, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userData = await user.findById(userId);

    const classData = await Class.findOne({ _id: userData.className })
      .populate({
        path: "assignment",
        options: { sort: { createdAt: -1 } },
      });
    const assignment = classData.assignment;
    if (!assignment) {
      return res.status(200).json({ message: "No assignment is available." })
    }
    return res.status(200).json({ assignment });
  } catch (error) {
    console.error("Error adding assignment:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

assignmentRouter.get('/get-all-assignment', authentication, async (req, res) => {
  try {
    const assignment = await Assignment.find().sort({ createdAt: -1 });
    if (!assignment) {
      return res.status(200).json({ message: "No assignment is available." })
    }
    return res.status(200).json({ assignment });
  } catch (error) {
    console.error("Error adding assignment:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

assignmentRouter.delete('/delete-assignment/:id', authentication, async (req, res) => {
  try {
    const assignmentId = req.params.id;

    const assignData = await Assignment.findById(assignmentId);

    const classId = assignData.className;
    await Assignment.findByIdAndDelete(assignmentId);
    await Class.findByIdAndUpdate(classId, { $pull: { assignment: assignmentId } });
    return res.status(200).json({ message: "Assignment deleted Successfully." });
  } catch (error) {
    console.error("Error adding assignment:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});


module.exports = assignmentRouter;
