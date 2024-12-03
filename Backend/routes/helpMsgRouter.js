const express = require('express');
const HelpMsg = require('../models/helpMsg.model');
const authentication = require('../Authentication/auth');
const helpMsgRouter = express.Router();

helpMsgRouter.post('/send-msg', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required and must be a non-empty string.' });
    }

    const newMessage = new HelpMsg({ message });
    await newMessage.save();

    return res.status(200).json({ message: 'Your message has been noted.' });
  } catch (error) {
    console.error('Error saving message:', error);
    return res.status(500).json({ error: 'An error occurred while saving your message.' });
  }
});

helpMsgRouter.get('/all-msg', authentication, async (req, res) => {
  try {
    const allMsg = await HelpMsg.find().sort({ createdAt: -1 });
    return res.status(200).json({ messages: allMsg });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    return res.status(500).json({ error: 'An error occurred while retrieving messages.' });
  }
});

module.exports = helpMsgRouter;
