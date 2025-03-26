import React from 'react';
import Image from "../../assets/card.jpeg"

const DealCard = () => {
  return (
    <div className='flex gap-4 mx-4 border border-[#cacaca] rounded-lg  shadow-lg min-w-[277px]'>
      <img src={Image} className='min-w-[105px] object-cover rounded-lg'/>
      <div className='px-4 py-1 min-w-1/2'>
        <p className='text-sm'> FLAT</p>
        <p className='text-base font-medium'>50% OFF</p>
        <p className='text-[10px] text-[#222]'>Lorem ipsum dolor sit amet, consectetur.....</p>
        <button className='bg-[#592EA921] rounded-lg px-4 py-2 text-[#592EA9] shadow-lg mt-2'>View</button>
      </div>
    </div>
  )
}

export default DealCard
