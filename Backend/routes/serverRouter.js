const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const serverRouter = express.Router();

dotenv.config();

// Use express.json() middleware to parse the request body
serverRouter.use(express.json());

serverRouter.post('/ai', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions', // Correct endpoint for chat models
      {
        model: 'gpt-3.5-turbo',  // Use 'gpt-3.5-turbo' or 'gpt-4' for newer models
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150, // Increased token limit for a more detailed response
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json({ response: response.data.choices[0].message.content.trim() });
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error);

    if (error.response) {
      res.status(error.response.status).json({
        error: 'Error from OpenAI API',
        message: error.response.data,
      });
    } else {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message,
      });
    }
  }
});

module.exports = serverRouter;
