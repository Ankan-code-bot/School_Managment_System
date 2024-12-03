const express = require('express');
const axios = require('axios');
const AiRouter = express.Router();

AiRouter.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  const apiKey = process.env.HUGGINGFACE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Hugging Face API key is missing.' });
  }

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill',
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );


    const botResponse = response.data[0]?.generated_text || 'Sorry, I couldn\'t respond.';
    return res.status(200).json({ reply: botResponse });
  } catch (error) {
    console.error('Error with AI request:', error);
    return res.status(500).json({ error: 'AI service failed. Try again later.' });
  }
});

module.exports = AiRouter;
