import React, { useState } from 'react';
import axios from 'axios';

const Aifriend = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await axios.post('http://localhost:3000/api/ai', { prompt });
      setResponse(result.data.response);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setError('There was an error processing your request. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="container h-screen mt-0 md:mt-20">
      <h1>AI Prompt</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <textarea
          className="border p-2 text-blue-950"
          placeholder="Enter your prompt here"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white"
          disabled={!prompt.trim()} // Disable button if prompt is empty
        >
          {loading ? 'Loading...' : 'Get Response'}
        </button>
      </form>

      {error && <div className="mt-4 p-2 bg-red-300 text-white">{error}</div>} {/* Display error message */}

      {response && <div className="mt-4 p-2 bg-gray-200">{response}</div>}
    </div>
  );
};

export default Aifriend;
