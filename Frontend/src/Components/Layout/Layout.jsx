import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer/Footer';
import { FaSchool } from "react-icons/fa";
import UnauthorizedPage from '../Pages/UnauthorizedPage ';

export const Layout = () => {
  const userName = localStorage.getItem("userName");
  const isLogged = localStorage.getItem("isLogged");

  return (
    <>
      {isLogged ? (
        <div>
          <nav className="fixed w-full bg-gradient-to-r z-20 from-[#d787cc] to-[#004E99] p-4 text-white md:block hidden shadow-md">
            <div className="container mx-auto flex items-center justify-between">
              <div className='flex flex-row gap-4'>
                <FaSchool className="text-4xl text-indigo-500 group-hover:animate-spin transition-all duration-300" />
                <div className="text-xl font-bold group-hover:text-indigo-500 transition-colors duration-300">
                  School Management System
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">👋</span>
                <p className="text-lg">
                  Hi, <span className="font-semibold">{userName}</span>!
                </p>
              </div>
            </div>
          </nav>

          <div className='flex flex-col md:flex-row text-white'>
            <div className='w-full h-auto md:w-1/6'>
              <Sidebar />
            </div>
            <div className='w-full md:w-5/6 bg-[url(https://wallpaperaccess.com/full/1685406.jpg)]'>
              <Outlet />
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        <UnauthorizedPage />
      )}
    </>
  );
};
