const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    require: true,
  },
  deadline: {
    type: Date,
  },
  className: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  }
}, { timestamps: true });

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;