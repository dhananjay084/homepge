import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import CouponModal from '../modals/couponModels'; 


const BannerCard = ({data}) => {
  if (!data) return null; 
    const navigate = useNavigate();
    const handleCardClick = () => {
        navigate(`/deal/${data._id}?category=${data.categorySelect}`);
      };
       const [modalOpen, setModalOpen] = useState(false);
     
       const handleModalClick = () => {
         setModalOpen(true);
       };
  return (
    <>
    <div className="bg-white rounded-2xl  w-full max-w-sm overflow-hidden min-w-[322px]">
      {/* Image */}
      <img
        src={data.dealImage}
        alt="Promotion"
        className="w-full h-[250px] object-cover rounded-2xl"
      />

      {/* Content */}
      <div className="p-2 flex justify-between items-center">
        <span className='max-w-[60%]'>
        <p className="text-[#592EA9] font-semibold text-lg">
          <span className="text-[#592EA9] font-bold">{data.homePageTitle}</span>
        </p>

        </span>
        {
          data.dealCategory==='deal'?
        <button
          className=" bg-[#E5DBF9] text-[#592EA9] px-6 py-2 text-sm rounded-full shadow-md hover:bg-[#d6c6f5] transition-all"
       onClick={handleCardClick} >
          Shop Now
        </button>
        :
        <button
        className=" bg-[#E5DBF9] text-[#592EA9] px-6 py-2 text-sm rounded-full shadow-md hover:bg-[#d6c6f5] transition-all"
     onClick={handleModalClick} >
        Show Code
      </button>
}
      </div>
    </div>
     <CouponModal
     open={modalOpen}
     onClose={() => setModalOpen(false)}
     data={data}
   />
   </>
  );
};

export default BannerCard;
