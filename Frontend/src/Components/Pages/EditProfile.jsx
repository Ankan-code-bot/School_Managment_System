import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const EditProfile = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    mobileNo: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/user-details`, {
          withCredentials: true,
        });
        setUserData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Error Response:", error.response?.data || error.message);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.mobileNo || !formData.address) {
      toast.error("All fields (name, email, mobile no, and address) are required.");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_BASEURL}/api/update-info`,
        formData,
        { withCredentials: true }
      );
      toast.success(response.data.message || "Profile updated successfully!");
      setTimeout(() => {
        navigate('/layout');

      }, 2500);
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-[url(https://th.bing.com/th/id/R.837704aae5e2148facf33cd850df237b?rik=pAu%2ffQtooSs8RQ&riu=http%3a%2f%2fwww.pixelstalk.net%2fwp-content%2fuploads%2f2016%2f03%2fBackground-Beautiful-Nature-wallpaper-HD.jpg&ehk=Jv7p2155beB9tEVNlgc4feCkvmvaqrk%2foEukyvKNZZk%3d&risl=&pid=ImgRaw&r=0)] bg-cover bg-center flex justify-center items-center p-4">
        <div className="bg-inherit p-8 rounded-lg shadow-lg w-full sm:w-[90%] md:w-[60%] lg:w-[40%]">
          <h2 className="text-3xl text-black font-semibold mb-6 text-center">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-black font-semibold text-xl block mb-2">Username</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black"
                required
              />
            </div>

            <div>
              <label className="text-black font-semibold text-xl block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black"
                required
              />
            </div>

            <div>
              <label className="text-black font-semibold text-xl block mb-2">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black"
                rows="3"
                required
              ></textarea>
            </div>

            <div>
              <label className="text-black font-semibold text-xl block mb-2">Mobile No.</label>
              <input
                type="text"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
