import React from 'react';
import Image from "../../assets/brand.jpeg";

const PopularStores = () => {
  return (
    <div className="relative border border-[#cacaca] rounded-lg shadow-lg flex-shrink-0 w-[200px] md:w-[220px] lg:w-[250px] overflow-hidden">
      <img src={Image} className="w-full h-[120px] md:h-[140px] lg:h-[160px] object-cover rounded-lg" alt="Store" />
      <div className="absolute bottom-3 z-10  items-center w-full px-2 space-y-2">
        <div className="bg-[#E9E4F4] flex w-full rounded-lg items-center p-1">
          <span className="bg-[#592EA9] w-[20%] h-4 rounded-lg"></span>
          <p className="text-[10px] ml-1">Flat 8% Cashback</p>
        </div>
        <button className="bg-[#E9E4F4] rounded-lg text-xs p-2 text-[#592EA9] shadow-lg float-right">View</button>
      </div>
    </div>
  );
};

export default PopularStores;
