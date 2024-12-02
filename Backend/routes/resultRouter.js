const express = require('express');
const authentication = require('../Authentication/auth');
const Result = require('../models/result.model');
const user = require('../models/User.model');
const resultRouter = express.Router();

resultRouter.post('/post-result', authentication, async (req, res) => {
  try {
    const { studentId, Bengali, English, Mathematics, History, Geography, Physics, Biology } = req.body;

    if (!studentId || Bengali == null || English == null || Mathematics == null ||
      History == null || Geography == null || Physics == null || Biology == null) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const studentDetails = await user.findById(studentId);
    if (!studentDetails) {
      return res.status(404).json({ message: "Student not found." });
    }

    const classId = studentDetails.className;


    const total = Number(Bengali) + Number(English) + Number(Mathematics) + Number(History) + Number(Geography) + Number(Physics) + Number(Biology);

    const newResult = new Result({
      className: classId,
      bengali: Bengali,
      english: English,
      mathematics: Mathematics,
      history: History,
      geography: Geography,
      physics: Physics,
      biology: Biology,
      total,
      student: studentId,
    });

    const result = await newResult.save();

    await user.findByIdAndUpdate(studentId, { $push: { results: result._id } }, { new: true });
    return res.status(201).json({ message: "Result created successfully." });
  } catch (error) {
    console.error("Error creating result:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

resultRouter.get('/get-result', authentication, async (req, res) => {
  try {
    const studentId = req.user.userId;

    const studentDetails = await user.findById(studentId).populate({
      path: 'results'
    }).sort({ createdAt: -1 }).limit(2);

    if (!studentDetails) {
      return res.status(404).json({ message: "Student not found." });
    }

    return res.status(200).json({ results: studentDetails.results });
  } catch (error) {
    console.error("Error fetching results:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
});

// resultRouter.put('/update-result', authentication, async (req, res) => {
//   try {
//     const { resultId, Bengali, English, Mathematics, History, Geography, Physics, Biology } = req.body;

//     // Validate input
//     if (!resultId || Bengali == null || English == null || Mathematics == null ||
//       History == null || Geography == null || Physics == null || Biology == null) {
//       return res.status(400).json({ message: "Missing required fields." });
//     }

//     // Calculate the total marks
//     const total = Number(Bengali) + Number(English) + Number(Mathematics) +
//       Number(History) + Number(Geography) + Number(Physics) + Number(Biology);

//     // Find and update the result
//     const updatedResult = await Result.findByIdAndUpdate(
//       resultId,
//       {
//         bengali: Bengali,
//         english: English,
//         mathematics: Mathematics,
//         history: History,
//         geography: Geography,
//         physics: Physics,
//         biology: Biology,
//         total
//       },
//       { new: true } // Return the updated document
//     );

//     if (!updatedResult) {
//       return res.status(404).json({ message: "Result not found." });
//     }

//     return res.status(200).json({ message: "Result updated successfully.", updatedResult });
//   } catch (error) {
//     console.error("Error updating result:", error);
//     return res.status(500).json({ message: "Internal Server Error." });
//   }
// });

module.exports = resultRouter;
