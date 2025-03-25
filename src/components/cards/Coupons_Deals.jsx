import React from 'react';
import Image from "../../assets/Coupons_deals.jpeg"

const Coupons_Deals = () => {
  return (
    <div className='flex gap-4 items-center px-4'>
      <img src={Image} className='max-w-[50%] rounded-lg'/>
      <div>
        <h6 className='font-medium text-[13px]'>WALLMART</h6>
        <p className='text-[10px]'>Join Today and Enroll In Auto Renew to Get to... </p>
        <button className='bg-[#E9E4F4] rounded-lg px-4 py-2 text-[#592EA9] shadow-lg mt-2'>Coupon Code</button>

      </div>
    </div>
  )
}

export default Coupons_Deals
