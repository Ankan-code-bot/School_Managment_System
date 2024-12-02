import React from 'react';
import { useNavigate } from 'react-router-dom';

export const DeleteProfile = () => {
  const navigate = useNavigate();

  const handleDelete = () => {
    // Perform logout logic here
    console.log("Profile Deleted");
    navigate('/login'); // Redirect to login page after logout
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div
        className="bg-white p-8 rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-blue-950 mb-6">
          Are you sure you want to Delete your profile permanently?
        </h1>
        <p className="text-blue-700 mb-6">
          If you delete profile, you will need to sign up again to continue.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition"
          >
            Yes, Delete
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-400 focus:ring-4 focus:ring-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};