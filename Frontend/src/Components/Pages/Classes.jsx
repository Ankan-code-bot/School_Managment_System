import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from 'react-redux';

const ClassesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClassClick = (className) => {
    const fetchAttendanceSheet = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/add-new-attendance`, { className }, { withCredentials: true });
        const attendId = response.data.attendId;
        localStorage.setItem("attendId", attendId);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate(`attendance/${className}`);
        }, 2500);
      } catch (error) {
        console.error("Error fetching Attendance Sheet:", error);
        toast.error("Failed to load");
      }
    };
    fetchAttendanceSheet();
  };

  return (
    <>
      <Toaster />
      <div className="grid grid-cols-2 sm:grid-cols-3 bg-[url(https://www.viewbug.com/media/mediafiles/2015/11/21/60639491_large.jpg)] lg:grid-cols-4 gap-4 p-6 h-screen mt-0 md:mt-20">
        {['Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'].map((className) => (
          <div
            key={className}
            className="bg-gradient-to-tr from-purple-700 to-pink-400 text-blue-950 text-center text-3xl font-semibold h-[10vh] md:h-[20vh] p-6 rounded-lg shadow-lg cursor-pointer hover:bg-purple-900"
            onClick={() => handleClassClick(className)}
          >
            {className}
          </div>
        ))}
      </div>
    </>
  );
};

export default ClassesPage;