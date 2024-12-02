const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  className: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  bengali: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  english: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  mathematics: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  history: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  geography: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  physics: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  biology: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  total: {
    type: Number,
    default: 0,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
}, { timestamps: true });

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
