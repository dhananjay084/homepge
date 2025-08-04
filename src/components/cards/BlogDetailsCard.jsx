import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Coupons_Deals = ({ border ,data}) => {
    console.log(data)
  if (!data) return null; 
    const navigate = useNavigate();
 
const handleDealClick =()=>{
    navigate(`/blog/${data._id}`);


}
  return (
    <>
      <div
       
        className={`flex min-w-[400px] gap-4 items-center px-4 cursor-pointer ${border ? 'border-2 py-4 rounded-xl border-[#f1f1f1] mx-2 shadow-[0px_2px_10px_rgba(202,202,202,1)] ' : ''}`}
      >
        {/* Image */}
        <div className={`relative ${border?'max-w-[50%]':'max-w-[35%]'} rounded-lg overflow-hidden`}>
          <img src={data.image} className='rounded-lg w-full max-h-[150px]' />
         
        </div>

        {/* Text Content */}
        <div>
          <Typography color={'primary'} sx={{ fontWeight: 500, fontSize: '13px' }}>
            {`${data.heading.substring(0,40)}..`}
          </Typography>
          <Typography color={'black'} sx={{ fontWeight: 500, fontSize: '10px' }}>
          {`${data.details.substring(0,60)}...`}

          </Typography>

   
            <button
            style={{
              backgroundColor: '#E9E4F4',
              color:  '#592EA9'
            }}
            className="rounded-lg px-4 py-2 shadow-lg mt-2"
            onClick={handleDealClick}
          >
            View
          </button>


          
        </div>
      </div>

      {/* Modal */}
    
    </>
  );
}

Coupons_Deals.defaultProps = {
  border: false,
  disabled: false
}

export default Coupons_Deals;
