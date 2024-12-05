import React, { useState } from 'react';
import axios from 'axios';

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/chat`, { message: input });
      const aiMessage = { sender: 'ai', text: response.data.reply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error response:", error.response);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Error connecting to AI. Try again later.' },
      ]);
    } finally {
      setInput('');
      setLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-[url(https://images.wallpapersden.com/image/download/amazing-night-at-mountains_bGpobGuUmZqaraWkpJRmbmdlrWZqaGc.jpg)] text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-8 hidden md:block">AI Chat</h1>
      <div className="w-full max-w-md h-[85vh] md:h-[89vh] bg-[url(https://th.bing.com/th/id/OIP.qXVdP1wDYqfuK3dYMQg2TQHaL2?rs=1&pid=ImgDetMain)] p-4 rounded-md mt-4 flex flex-col space-y-3">
        <div className="flex-grow overflow-y-auto h-96">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
            >
              <div
                className={`p-2 mt-2 rounded-md ${msg.sender === 'user' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            className="flex-grow p-2 rounded-md bg-gray-600 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
            disabled={loading}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;