
import React from 'react';
import Image from "../../assets/brand.jpeg";

const PopularBrandCardWithText = () => {
  return (
    <div>
    <div className="relative border border-[#cacaca] rounded-lg shadow-lg flex-shrink-0 w-[200px] md:w-[220px] lg:w-[250px] overflow-hidden">
      <img src={Image} className="w-full h-[120px] md:h-[140px] lg:h-[160px] object-cover rounded-lg" alt="Brand" />
      <div className="absolute bottom-3 right-5 z-10">
        <button className="bg-[#E9E4F4] rounded-lg px-4 py-2 text-[#592EA9] shadow-lg">View</button>
      </div>
    </div>
    <div className='my-2 text-white'>  
    <p>LOFT</p>
    <p>50% OFF</p>
    <p>Get 5% off your purchase with email sign-up</p>
    </div>
    </div>
  );
};

export default PopularBrandCardWithText;

