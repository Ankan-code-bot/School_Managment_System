import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export const DeleteUser = () => {
  const [userId, setUserId] = useState("");

  const handleDelete = async () => {
    if (!userId) {
      toast.error("Please enter a user ID.");
      return;
    }

    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_BASEURL}/api/delete-user`, {
        data: { userId },
      }, { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("User deleted successfully.");
        setUserId("");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || "Failed to delete user.");
    }
  };

  const role = localStorage.getItem("role");
  return (
    <>
      <Toaster />
      {role === "Admin" && (
        <div className="delete-user-container p-6 md:mt-[8vh] h-screen bg-[url(https://th.bing.com/th/id/R.6a7a745d0cf6e1478e104e6a7fee6cc1?rik=xULJFzGntGDtew&riu=http%3a%2f%2fwonderfulengineering.com%2fwp-content%2fuploads%2f2016%2f01%2fnature-wallpapers-38.jpg&ehk=dUtU7hvI%2bIv1ZAogg0%2b%2fznLW5KEYTsPob9LlywpnX1Q%3d&risl=&pid=ImgRaw&r=0)] rounded-md shadow-md">
          <h2 className="text-3xl text-center font-bold mb-4">Delete User Permanently</h2>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
            className="border border-gray-300 text-blue-700 rounded p-2 mb-4 w-full"
          />
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Delete User
          </button>
        </div>
      )}
    </>
  );
};
