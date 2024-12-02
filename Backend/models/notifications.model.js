const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Notifications = mongoose.model('Notifications', notificationSchema);

module.exports = Notifications;
