const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
  date: {
    type: String,
    required: true,
    default: () => new Date().toISOString().split('T')[0],
  },
  className: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  records: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true,
        default: "Absent",
      },
    },
  ],
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
