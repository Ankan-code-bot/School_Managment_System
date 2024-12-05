import React from "react";

export const Footer = () => {
  return (
    <footer className=" text-zinc-300 py-6 px-4 bg-gradient-to-br from-slate-800 to-zinc-900">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm md:text-base">
          <span>&copy; {new Date().getFullYear()} School Management System. All Rights Reserved.</span>
        </div>

        <div className="my-4 md:my-0 flex space-x-4">
          <a
            href="#about"
            className="hover:text-white transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors duration-200"
          >
            Contact
          </a>
          <a
            href="#privacy"
            className="hover:text-white transition-colors duration-200"
          >
            Privacy Policy
          </a>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-200"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};
