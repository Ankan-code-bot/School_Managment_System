const express = require('express');
const authentication = require('../Authentication/auth');
const Subject = require('../models/subject.model');
const user = require('../models/User.model');
const subjectRouter = express.Router();

subjectRouter.post('/add-subject', authentication, async (req, res) => {
  try {
    const { subject } = req.body;
    const newSubject = Subject({ name: subject });
    await newSubject.save();
    return res.status(200).json({ message: "New Subject Added Successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server erorr." });
  }
});

subjectRouter.put('/add-teacher/:id', authentication, async (req, res) => {
  try {
    const { teacherName } = req.body;
    const subId = req.params.id;
    const userData = await user.findOne({ name: teacherName, role: "Teacher" });

    if (!userData) {
      return res.status(404).json({ message: "Please Enter registered teacher name." });
    }
    const SubjectData = await Subject.findById(subId);
    const teacherId = userData._id;

    const isPresent = SubjectData.teacher.includes(teacherId);
    if (isPresent) {
      return res.status(404).json({ message: `This teacher is already allocated for ${SubjectData.name}` });
    }
    await Subject.findByIdAndUpdate(subId, { $push: { teacher: teacherId } });
    return res.status(200).json({ message: `Teacher of ${SubjectData.name} Is added Successfully.` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server erorr." });
  }
});

subjectRouter.get('/get-all-subject', authentication, async (req, res) => {
  try {
    const AllSubject = await Subject.find();
    if (!AllSubject) {
      return res.status(200).json({ message: "No Subject is added." });
    }
    return res.status(200).json({ AllSubject });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server erorr." });
  }
});

subjectRouter.get('/get-all-teacher/:id', authentication, async (req, res) => {
  try {
    const subId = req.params.id;
    const SubjectData = await Subject.findById(subId).populate({ path: "teacher" });
    const teachers = SubjectData.teacher;
    return res.status(200).json({ teachers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server erorr." });
  }
});
module.exports = subjectRouter;