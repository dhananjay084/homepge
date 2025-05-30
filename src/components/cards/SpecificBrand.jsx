import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Image from "../../assets/Coupons_deals.jpeg";
import Tick from '../../assets/tick.png';
import User from '../../assets/user.jpeg';

const Specific_brand = ({ border }) => {
  const [showVerifications, setShowVerifications] = useState(false);

  const toggleVerifications = () => {
    setShowVerifications(!showVerifications);
  };

  return (
    <div className={`px-4 ${border ? 'border-2 py-4 rounded-xl border-[#f1f1f1] mx-2 shadow-[0px_2px_10px_rgba(202,202,202,1)] hover:border-[#592EA9] transition-colors duration-300' : ''}`}>
      {/* Image Container */}
      <div className="flex justify-between">
        <div className='flex gap-2 items-center'>
          <img src={Image} className='rounded-lg w-[20%] min-h-[60px]' alt="Coupon" />
          <div>
            <p className='font-semibold text-2xl'>30% OFF</p>
            <span className='flex gap-2 items-center'><img src={Tick} alt="Success"/><p className='text-[#592EA9]'>97% success</p></span>
          </div>
        </div>
        <button
          style={{
            backgroundColor: '#E9E4F4',
            color: '#592EA9'
          }}
          className="rounded-lg px-4 py-1 shadow-lg min-w-[40%] h-fit"
        >
          Coupon Code
        </button>
      </div>
      
      <span className='flex gap-2 my-4 items-center'>
        <span className='border border-[#353535] rounded-[35px] p-2'>Storewide</span>
        <p className='text-[#592EA9]'>30% Off Storewide at Walmart</p>
      </span>
      
      {/* Verification Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <img src={User} className="w-6 h-6 rounded-full border-2 border-white" alt="User" />
            <img src={User} className="w-6 h-6 rounded-full border-2 border-white" alt="User" />
            <img src={User} className="w-6 h-6 rounded-full border-2 border-white" alt="User" />
          </div>
          <p className="text-sm text-gray-500">Last used 30min ago</p>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <button 
            className="text-[#5B5B5B] text-sm font-medium flex items-center gap-1"
            onClick={toggleVerifications}
          >
            Show verifications
            {showVerifications ? (
              <FiChevronUp size={16} className="transition-transform" />
            ) : (
              <FiChevronDown size={16} className="transition-transform" />
            )}
          </button>
        </div>

        {/* Expandable Content */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showVerifications ? 'max-h-96' : 'max-h-0'}`}>
          <div className="pt-3">
            <div className="pt-3 flex gap-4">
             <div className='bg-[#F6F6F6] border border-[#E1E1E1] rounded-lg p-4'>
                <p>Total Uses</p>
                <p className='text-xl font-semibold text-[#592EA9]'>600</p>
             </div>
             <div className='bg-[#F6F6F6] border border-[#E1E1E1] rounded-lg p-4'>
                <p>Last Used</p>
                <p className='text-xl font-semibold text-[#592EA9]'>30min ago</p>
             </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Specific_brand.defaultProps = {
  border: false,
}

export default Specific_brand;