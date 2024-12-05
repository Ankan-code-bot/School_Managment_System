import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { profileName } from "../../Store/profile";
import toast, { Toaster } from "react-hot-toast";

export const Profile = () => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const [attendanceData, setAttendanceData] = useState(null);
  const [percentage, setPercentage] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/user-details`, {
          withCredentials: true,
        });
        setUserData(response.data);
        dispatch(profileName(response.data.name));
      } catch (error) {
        console.error("Error Response:", error.response?.data || error.message);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    if (userData.attendance && userData.className) {
      const fetchAttendanceData = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_BASEURL}/api/get-all-attendace`,
            { className: userData.className },
            {
              withCredentials: true,
            }
          );
          setAttendanceData(response.data);

          if (response.data.allattendDetails) {
            const totalClasses = response.data.allattendDetails.length;
            const attendedClasses = userData.attendance.length;
            const calculatedPercentage = (attendedClasses / totalClasses) * 100;
            setPercentage(calculatedPercentage.toFixed(2));
          }
        } catch (error) {
          toast.error("Error fetching attendance data:", error.response?.data || error.message);
        }
      };
      fetchAttendanceData();
    }
  }, [userData]);

  localStorage.setItem("userName", userData.name);

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("myFile", file);

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_BASEURL}/api/change-image`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
              withCredentials: true,
            }
          );
          setUserData((prev) => ({ ...prev, avater: response.data.secure_url }));
          toast.success("Profile picture updated successfully!");
          setTimeout(() => {
            window.location.reload(true);

          }, 2500);
        } catch (error) {
          console.error("Error updating profile picture:", error.response?.data || error.message);
          toast.error("Failed to update profile picture.");
        }
      }
    };
    input.click();
  };

  const role = localStorage.getItem("role");
  return (
    <><Toaster />
      <div className="shadow-md rounded-lg relative text-white h-screen z-0 bg-[url(https://th.bing.com/th/id/R.3364ae8de9b241c64188b50f67294947?rik=pJOT%2f5hfmnxwrw&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f03%2fBeautiful-Nature-wallpaper-background-free.jpg&ehk=y%2bAZIiPuwRq5zjDm6AcPFysoAC7o3qknhfJh3%2bzrbdk%3d&risl=1&pid=ImgRaw&r=0)] bg-cover bg-center md:mt-[8vh] flex items-center flex-col">
        <div
          className="rounded-full mt-[10vh] bg-yellow-300 md:h-[30vh] md:w-[30vh] h-[20vh] w-[20vh] flex justify-center items-center cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={userData.avater || "/path/to/default-avatar.jpg"}
            alt="Profile Img"
            className="object-fill w-full h-full rounded-full"
          />
        </div>

        <div className="space-y-5 mt-10">
          <div className="flex items-center">
            <span className="w-16 font-bold text-blue-900 md:w-32 text-xl md:text-3xl md:ml-20 ml-16">Name: </span>
            <span className="text-xl font-semibold md:text-2xl md:ml-0 ml-4">{userData.name || "N/A"}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-blue-900 w-16 md:w-32 text-xl md:text-3xl ml-5 md:ml-20">Email: </span>
            <span className="text-xl md:text-2xl">{userData.email || "N/A"}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-blue-900 w-16 md:w-32 text-xl md:text-3xl md:ml-20 ml-12">Phone: </span>
            <span className="text-xl md:text-2xl md:ml-0 ml-4">{userData.mobileNo || "N/A"}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-blue-900 w-16 md:ml-20 ml-10 md:w-32 text-xl md:text-3xl">Address: </span>
            <span className="text-xl md:ml-0 md:text-2xl ml-6">{userData.address || "N/A"}</span>
          </div>
          {role === "Student" && (
            <div className="h-auto rounded-md bg-blue-300 flex flex-col items-center justify-center p-6">
              {percentage !== null ? (
                <div className="text-xl text-gray-700">
                  <p>Total Attendance Percentage: <strong>{percentage}%</strong></p>
                </div>
              ) : (
                <p className="text-gray-500">Fetching attendance data...</p>
              )}
            </div>
          )}
        </div>
      </div>

    </>
  );
};
