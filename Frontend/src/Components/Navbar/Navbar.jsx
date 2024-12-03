import React, { useEffect, useState } from "react";
import { FaSchool } from "react-icons/fa";

export const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bg-gradient-to-br z-20 from-slate-800 w-full to-zinc-900 text-white flex items-center justify-between p-4 shadow-lg">
      <div className="flex items-center space-x-3 group cursor-pointer">
        <div className="relative">
          <FaSchool className="text-4xl text-indigo-500 group-hover:animate-spin transition-all duration-300" />
          <div className="absolute -inset-1 bg-indigo-500 rounded-full blur-md opacity-30 hidden group-hover:block"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold group-hover:text-indigo-500 transition-colors duration-300">
            School Management System
          </span>
          <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
            Manage your school efficiently
          </span>
        </div>
      </div>

      <div className="text-right text-lg font-medium">
        <div>{currentTime.toLocaleDateString()}</div>
        {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
};
