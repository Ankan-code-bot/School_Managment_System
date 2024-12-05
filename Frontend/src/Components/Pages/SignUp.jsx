import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    className: "",
    address: "",
    mobileNo: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 5) {
      toast.dismiss("Password must be at least 5 characters long.");
      return;
    }

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      toast.dismiss("Name, email, password, and role are required fields.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/sign-up`, formData, { withCredentials: true });
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message);
    }
  };


  return (
    <>
      <Toaster />
      <Navbar />
      <div className="min-h-screen max-w-screen bg-zinc-900 flex justify-center items-center p-4">
        <div className="bg-black p-8 rounded-lg shadow-lg w-full sm:w-[90%] md:w-[60%] lg:w-[80%] xl:w-[40%]">
          <h2 className="text-3xl text-white mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-white block mb-2">Username</label>
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
              <label className="text-white block mb-2">Email</label>
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
              <label className="text-white block mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black"
                required
              />
            </div>
            <div>
              <label className="text-white block mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black"
                required
              />
            </div>

            <div>
              <label className="text-white block mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black"
                required
              >
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>
            </div>

            <div>
              <label className="text-white block mb-2">Class</label>
              <select
                name="className"
                value={formData.className}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-black"
                required
              >
                <option value="">Select Class</option>
                <option value="Five">Five</option>
                <option value="Six">Six</option>
                <option value="Seven">Seven</option>
                <option value="Eight">Eight</option>
                <option value="Nine">Nine</option>
                <option value="Ten">Ten</option>
              </select>
            </div>
            <div>
              <label className="text-white block mb-2">Address</label>
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
              <label className="text-white block mb-2">Mobile No.</label>
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
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
