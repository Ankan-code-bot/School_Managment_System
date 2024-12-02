import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-zinc-700 via-slate-700 to-zinc-900 h-[79vh] md:h-screen flex items-center justify-center">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-4 mt-2">
          <Link to='/login' className="h-[18vh] md:h-[30vh] w-[100vw] md:w-[35vw] lg:w-[20vw] max-w-[250px] rounded-lg flex flex-col items-center justify-center font-semibold shadow-lg text-white transition-transform duration-300 transform hover:scale-105 bg-gradient-to-br from-green-400 to-blue-500">
            <FaUserGraduate className="text-white text-5xl mb-4" />
            <span className="text-xl">Student Login</span>
            <span>Click here to Login portal</span>
          </Link>

          <Link to='/login' className="h-[18vh] md:h-[30vh] w-[100vw] md:w-[35vw] lg:w-[20vw] max-w-[250px] rounded-lg flex flex-col items-center justify-center font-semibold shadow-lg text-white transition-transform duration-300 transform hover:scale-105 bg-gradient-to-br from-yellow-400 to-orange-500">
            <FaChalkboardTeacher className="text-white text-5xl mb-4" />
            <span className="text-xl">Teacher Login</span>
            <span>To Login click here...</span>
          </Link>

          <Link to='/login' className="h-[18vh] md:h-[30vh] w-[100vw] md:w-[35vw] lg:w-[20vw] max-w-[250px] rounded-lg flex flex-col items-center justify-center font-semibold shadow-lg text-white transition-transform duration-300 transform hover:scale-105 bg-gradient-to-br from-pink-400 to-red-500">
            <FaUserShield className="text-white text-5xl mb-4" />
            <span className="text-xl">Admin Login</span>
            <span>To Login click here...</span>
          </Link>

          <Link to='/login' className="h-[18vh] md:h-[30vh] w-[100vw] md:w-[35vw] lg:w-[20vw] max-w-[250px] rounded-lg flex flex-col items-center justify-center font-semibold shadow-lg text-white transition-transform duration-300 transform hover:scale-105 bg-gradient-to-br from-blue-300 to-blue-800">
            <FaHeadset className="text-zinc-300 text-5xl mb-4" />
            <span className="text-xl">Help Desk</span>
            <span>Contact for assistance</span>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};
