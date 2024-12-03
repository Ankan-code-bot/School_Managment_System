const mongoose = require('mongoose');

const helpMsgSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      minlength: [1, 'Message must be at least 1 character'],
      maxlength: [500, 'Message cannot exceed 500 characters']
    }
  },
  { timestamps: true }
);

const HelpMsg = mongoose.model('HelpMsg', helpMsgSchema);

module.exports = HelpMsg;
