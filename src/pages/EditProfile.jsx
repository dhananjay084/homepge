// src/pages/EditProfile.jsx
import React from 'react';
import ProfileImage from '../assets/ProfileImage.jpg'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
const EditProfile = () => {
    return (
        <div className="min-h-screen bg-white">
      <div className="relative bg-[#592EA9] h-30">
  {/* Header Title */}
  <div className="text-white p-4 flex items-center">
    <button className="text-xl mr-2">
      <ArrowBackIosIcon />
    </button>
    <h1 className="text-lg font-semibold flex-1 text-center">Edit Profile</h1>
  </div>

  {/* Profile Image + Edit Icon */}
  <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2">
    <div className="relative">
      <img
        src={ProfileImage}
        alt="User"
        className="w-20 h-20 rounded-full border-4 border-white object-cover"
      />
      {/* Edit Icon at bottom right of image */}
      <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow">
        <ModeEditIcon className="text-black text-sm" />
      </div>
    </div>
  </div>
</div>



           

            <form className="px-6 mt-10 space-y-4">
                <InputField label="Your name" placeholder="Input your first name" />
                <InputField label="Email address" placeholder="Input email address" />
                <InputField label="Password" placeholder="Input your password" type="password" />
                <InputField label="Phone Number" placeholder="Input phone number" />

                <button type="submit" className="w-full bg-black text-white py-2 rounded-md mt-4">
                    Update
                </button>
            </form>
        </div>
    );
};

const InputField = ({ label, placeholder, type = 'text' }) => (
    <div>
        <label className="block text-sm mb-1">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
    </div>
);

export default EditProfile;
