import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-blue-500">404</h1>
        <p className="text-3xl font-medium my-4">Oops! Page not found</p>
        <p className="text-lg mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
