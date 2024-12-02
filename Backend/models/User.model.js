const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  avater: {
    type: String,
    default: 'https://static.vecteezy.com/system/resources/previews/016/766/342/original/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-transparent-background-png.png'
  },
  address: {
    type: String,
    require: true
  },
  mobileNo: {
    type: Number,
    require: true
  },
  role: {
    type: String,
    enum: ['Student', 'Teacher', 'Admin'],
    required: true
  },
  className: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: function () {
      return this.role === 'Student';
    }
  },
  attendance: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attendance'
  }],
  results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Result'
    }
  ],
  otp: {
    type: String,
    default: null
  },             // Stores the OTP code
  otpExpiry: {
    type: Date,
    default: null
  }           // Stores the OTP expiration time

}, { timestamps: true });

const user = mongoose.model('user', userSchema);

module.exports = user;