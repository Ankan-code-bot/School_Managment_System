import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const HelpMsg = ({ setIsHome }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      toast.error('Message is required.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/send-msg`, {
        message,
      });

      const result = response.data;
      toast.success(result.message || 'Message sent successfully!');
      setMessage('');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className='h-screen flex justify-center items-center'>
        <div className="w-[80vw] md:w-[50vw] p-6 bg-zinc-900 text-white rounded-md shadow-md mt">
          <h1 className="text-2xl font-bold mb-4 text-center text-blue-400">Send Help Message</h1>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <textarea
              className="w-full p-3 border border-zinc-700 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              placeholder="Type your message here..."
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="flex items-center justify-center w-full p-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
              disabled={loading}
              onClick={() => setIsHome(true)}
            >
              {loading ? (
                <span className="loader inline-block w-4 h-4 border-2 border-t-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>Send</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m0 0l-3-3m3 3l-3 3"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
