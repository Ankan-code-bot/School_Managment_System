import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AttendancePage = () => {
  const { className } = useParams();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const attendId = localStorage.getItem("attendId");
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/get-all-user/${className}`, { withCredentials: true });
        setStudents(response.data.allUser);
        console.log(attendId);

      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [className]);

  const toggleAttendance = (studentId) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: prevAttendance[studentId] === 'Present' ? 'Absent' : 'Present',
    }));

    const updateAttendance = async () => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_BASEURL}/api/make-attendance/${studentId}`,
          { attendId },
          { withCredentials: true }
        );
        toast.success(response.data.message);
      } catch (error) {
        console.error("Error updating attendance:", error);
        toast.error("Failed to update attendance.");
      }
    };

    updateAttendance();
  };

  const today = new Date().toLocaleDateString();

  return (
    <>
      <Toaster />
      <div className="p-6 bg-[url(https://wallpapercave.com/wp/7CY2H2w.jpg)] bg-cover bg-center rounded-lg shadow-md h-screen mt-0 md:mt-16">
        <h2 className="text-4xl font-bold mb-4 text-center bg-pink-100 rounded-xl text-green-900">
          Attendance for Class {className}
        </h2>
        <p className="text-center text-lg bg-pink-50 rounded-3xl text-blue-700 mb-6">Date: {today}</p>
        <div
          className="flex justify-between items-center p-4 border mb-4 border-blue-200 rounded-lg shadow-md bg-white hover:bg-blue-100 transition duration-200"
        >
          <div className='flex gap-10'>
            <div className="text-lg font-medium text-blue-800">SI.</div>
            <div className="text-lg font-medium text-blue-800">Name</div>
          </div>
          <div className="text-lg md:block hidden font-medium text-blue-800">Student Id</div>

          <button
            className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-200 bg-blue-600 hover:bg-blue-700' hover:bg-gray-600'}`}
          >
            Attendance status
          </button>
        </div>
        <div className="space-y-4">
          {students.map((student, i) => (
            <div
              key={student._id}
              className="flex justify-between items-center p-4 border border-blue-200 rounded-lg shadow-md bg-white hover:bg-blue-100 transition duration-200"
            >
              <div className='flex gap-10'>
                <div className="text-lg font-medium text-blue-800">{i + 1}.</div>
                <div className="text-lg font-medium text-blue-800">{student.name}</div>
              </div>
              <div className="text-lg md:block hidden font-medium text-blue-800">{student._id}</div>

              <button
                onClick={() => toggleAttendance(student._id)}
                value={student.attendance}
                className={`px-4 py-2 rounded-lg text-white font-semibold transition duration-200 ${attendance[student._id] === 'Present' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-600'}`}
              >
                {attendance[student._id]}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AttendancePage;
