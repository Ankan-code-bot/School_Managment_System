import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";

export const ChangePass = () => {
  const [Isotp, setIsotp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    otp: "",
    newPass: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const userId = localStorage.getItem("userId")
  const handlePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/get-otp`, {
        email: formData.email,
        userId: userId
      });
      toast.success(response.data.message);
      setIsotp(true);
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to send email");
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    if (!formData.otp || !formData.newPass) {
      toast.error("Please fill out both fields.");
      return;
    }
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_BASEURL}/api/forgot-password`, {
        email: formData.email,
        otp: formData.otp,
        newPass: formData.newPass,
      });
      toast.success(response.data.message);
      setIsotp(false);
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };
  return (
    <div className="bg-[url(https://th.bing.com/th/id/R.fe14369a0eff333030ca1fc9725342b2?rik=5vlKtZwATE0%2fWQ&riu=http%3a%2f%2f3.bp.blogspot.com%2f-O1zZtHtvvvk%2fVdzpBHIvRuI%2fAAAAAAAACNA%2fFoJhfx6qWVs%2fs1600%2f18445879194_35b35c2820_k.jpg&ehk=7qHKWU2gOTwGwPfZybPYOs%2fM63YYSJo8zdx%2bQyfXc4s%3d&risl=&pid=ImgRaw&r=0)] bg-cover bg-center h-screen flex items-center justify-center">
      <Toaster />
      <div className={`${Isotp ? "hidden" : "bg-inherit"} p-8 rounded-lg w-80 md:w-96 shadow-lg`}>
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Enter your email
        </h2>
        <form onSubmit={handlePassword}>
          <div className="mb-4">
            <label htmlFor="email" className="text-zinc-400 block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your registered email"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Get otp
          </button>
        </form>
      </div>
      {Isotp && (
        <div className="bg-zinc-800 p-8 rounded-lg w-80 md:w-96 shadow-lg">
          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Reset Your Password
          </h2>
          <form onSubmit={handleOtp}>
            <div className="mb-4">
              <label htmlFor="otp" className="text-zinc-400 block mb-2">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter the OTP"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPass" className="text-zinc-400 block mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPass"
                name="newPass"
                value={formData.newPass}
                onChange={handleChange}
                className="w-full p-3 text-zinc-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
                placeholder="Enter your new password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>

  )
}
