import React from 'react';
import Image from "../../assets/Coupons_deals.jpeg"
import { Typography } from '@mui/material';

const Coupons_Deals = ({ border, disabled }) => {
  return (
    <div className={`flex gap-4 items-center px-4 ${border ? 'border-2 py-4 rounded-xl border-[#f1f1f1] mx-2 shadow-[0px_2px_10px_rgba(202,202,202,1)] ' : ''}`}>
      {/* Image Container */}
      <div className="relative max-w-[50%] rounded-lg overflow-hidden">
        <img src={Image} className='rounded-lg w-full' />
        
        {/* Overlay when disabled */}
        {disabled && (
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        )}
      </div>

      {/* Text Content */}
      <div>
        <Typography color={disabled ? 'disabled' : 'primary'} sx={{ fontWeight: 500, fontSize: '13px' }}>
          WALLMART
        </Typography>
        <Typography color={disabled ? 'disabled' : 'black'} sx={{ fontWeight: 500, fontSize: '10px' }}>
          Join Today and Enroll In Auto Renew to Get to...
        </Typography>

        {/* Button */}
        <button
          style={{
            backgroundColor: disabled ? '#b9b9b9' : '#E9E4F4',
            color: disabled ? '#AAA6B1' : '#592EA9'
          }}
          className="rounded-lg px-4 py-2 shadow-lg mt-2"
        >
          Coupon Code
        </button>
      </div>
    </div>
  );
}

Coupons_Deals.defaultProps = {
  border: false,
  disabled: false
}

export default Coupons_Deals;
