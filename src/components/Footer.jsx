import React, { useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sections = ["Product", "About", "Popular Categories", "Company", "Partners"];

  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Accordion Sections */}
        {sections.map((section, index) => (
          <div
            key={index}
            className="border-t border-gray-600 py-4 flex justify-between items-center cursor-pointer"
            onClick={() => handleToggle(index)}
          >
            <span className="text-lg">{section}</span>
            <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
          </div>
        ))}

        {/* Copyright Section */}
        <div className="text-center mt-8 text-gray-400">
          <p>© 2023 All Rights Reserved</p>
          <div className="flex justify-center space-x-6 mt-3">
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mt-6">
          <FacebookIcon className="text-3xl text-gray-400 hover:text-white cursor-pointer" />
          <TwitterIcon className="text-3xl text-gray-400 hover:text-white cursor-pointer" />
          <InstagramIcon className="text-3xl text-gray-400 hover:text-white cursor-pointer" />
          <YouTubeIcon className="text-3xl text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
