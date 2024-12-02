const express = require('express');
const authentication = require('../Authentication/auth');
const Notifications = require('../models/notifications.model');
const notificrouter = express.Router();

notificrouter.post('/give-new-notification', authentication, async (req, res) => {
  try {
    const { title, desc } = req.body;

    if (!title || !desc) {
      return res.status(400).json({ message: "Title and description are required." });
    }

    const newNotification = new Notifications({ title, desc });
    await newNotification.save();

    return res.status(200).json({ message: "Notification successfully posted." });
  } catch (error) {
    console.error("Error in posting notification:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


notificrouter.get('/get-all-notifications', authentication, async (req, res) => {
  try {
    const allNotifications = await Notifications.find().sort({ createdAt: -1 });
    return res.status(200).json({ notifications: allNotifications });
  } catch (error) {
    console.error("Error in fetching notifications:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = notificrouter;
