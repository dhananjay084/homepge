import React from 'react';
import Image from "../../assets/card.jpeg"

const DealCard = () => {
  return (
    <div className='flex gap-4 mx-4 border border-[#cacaca] rounded-lg  shadow-lg p-2'>
      <img src={Image} className='max-w-[105px] object-cover rounded-lg'/>
      <div className='p-4'>
       
        <p className='text-[10px] text-[#222]'>Lorem ipsum dolor sit amet, consectetur.....</p>
        <button className='bg-[#592EA921] rounded-lg px-4 py-2 text-[#592EA9] shadow-lg mt-2'>Contained</button>
      </div>
    </div>
  )
}

export default DealCard
