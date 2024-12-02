import React from 'react';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-red-900 flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-yellow-400">401</h1>
        <p className="text-3xl font-medium my-4">Unauthorized Access</p>
        <p className="text-lg mb-6">You do not have permission to view this page.</p>
        <Link
          to="/"
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-md text-xl transition duration-300 ease-in-out transform hover:scale-105"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
