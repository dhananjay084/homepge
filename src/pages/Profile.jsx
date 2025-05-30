// src/pages/Profile.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ProfileImage from '../assets/ProfileImage.jpg';
import LogoutIcon from '@mui/icons-material/Logout';

const Profile = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#592EA9] text-white ">
        <div className='p-4 flex items-center'>
        <button className="text-xl mr-2"><ArrowBackIosIcon/></button>
        <h1 className="text-lg font-semibold flex-1 text-center">Profile</h1>
        </div>
        <div className="flex p-4 gap-4">
            <div>        <img className="w-20 h-20 rounded-full border-4 border-white " src={ProfileImage} alt="User" />
       
            </div>
            <div>
            <p className="mt-2 font-medium">Hi, Kriti</p>
        <p className="text-sm text-white">kriti934@gmail.com</p>
        <Link to="/edit-profile">
          <button className="mt-2 px-4 py-1 bg-black text-white rounded-md text-sm">Edit Profile</button>
        </Link>
        </div>
      </div>
      </div>
      
     

      <div className="grid grid-cols-2 gap-2 px-4 py-2">
        <div className="bg-gray-100 text-center p-3 rounded">
          <p className="text-xs text-gray-600">Total Cashback</p>
          <p className="font-bold">₹0</p>
        </div>
        <div className="bg-gray-100 text-center p-3 rounded">
          <p className="text-xs text-gray-600">Total Rewards</p>
          <p className="font-bold">₹0</p>
        </div>
      </div>

      <div className=" mt-4">
        <Section title="Cashback & Rewards" items={["My Earnings", "Your Queries", "Payments History"]} />
        <Section title="Referrals" items={["Refer & Earn", "My Referrals"]} />
        <Section title="Support & Help" items={["Help", "Review Us", "Privacy Policy"]} />
      </div>

      <div className="text-right p-4">
        <button className="text-[#592EA9] font-semibold"><LogoutIcon/>Log Out</button>
      </div>
    </div>
  );
};

const Section = ({ title, items }) => (
    <>
    <p className="text-xs text-gray-500 mb-2 bg-gray-100 p-4">{title}</p>

  <div className="bg-white px-4 py-2">
    {items.map((item, index) => (
      <div key={index} className="flex justify-between items-center py-3  ">
        <p className="text-sm">{item}</p>
        <span>{'>'}</span>
      </div>
    ))}
  </div>
  </>
);

export default Profile;
