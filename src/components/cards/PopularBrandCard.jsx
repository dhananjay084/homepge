import React from 'react';
import { useNavigate } from 'react-router-dom';


const PopularBrandCard = ({data}) => {
    if (!data) return null;
      const navigate = useNavigate();
    
      const {
        storeImage,
        storeName
       
      } = data;
      const handleCardClick = () => {
        navigate(`/store/${data._id}`);
      };
  return (
    <div>
    <div className="relative border border-[#cacaca] rounded-lg shadow-lg flex-shrink-0 w-[200px] md:w-[220px] lg:w-[250px] overflow-hidden">
      <img src={storeImage} className="w-full h-[120px] md:h-[140px] lg:h-[160px] object-fill rounded-lg" alt="Brand" />
      <div className="absolute bottom-3 right-5 z-10">
        <button className="bg-[#E9E4F4] rounded-lg px-4 py-2 text-[#592EA9] shadow-lg" onClick={handleCardClick}>View</button>
      </div>
    </div>
      <div className='my-2 text-[#592EA9]'>  
      <p>{storeName}</p>
     
      </div>
      </div>
  );
};

export default PopularBrandCard;