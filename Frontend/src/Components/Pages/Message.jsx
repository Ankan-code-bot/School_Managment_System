import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/all-msg`, {
          withCredentials: true
        });
        setMessages(response.data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="min-h-screen bg-[url(https://images.wallpapersden.com/image/download/amazing-night-at-mountains_bGpobGuUmZqaraWkpJRmbmdlrWZqaGc.jpg)] text-white p-4 mt-0 md:mt-16">
      <h1 className="text-3xl font-bold mb-4">Messages</h1>
      <div className="space-y-4">
        {messages.length === 0 ? (
          <div>No messages available.</div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-md shadow-md">
              <p>{msg.
                message
              }</p>
              <span className="text-sm text-gray-400">{new Date(msg.createdAt).toLocaleString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Message;