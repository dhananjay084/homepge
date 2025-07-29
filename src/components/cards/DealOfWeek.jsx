import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material'
const DealOfWeek = ({data}) => {
    if (!data) return null; 
  const navigate = useNavigate();

  const {
    dealImage,
    homePageTitle,
  } = data;
  const handleCardClick = () => {
    navigate(`/deal/${data._id}?category=${data.categorySelect}`);
  };
  return (
   <div className=' text-xs space-y-1  w-[25%] min-w-[125px] ' onClick={handleCardClick}>
       <div className=' rounded-lg bg-white shadow-[0px_2px_10.3px_0px_rgba(0,0,0,0.25)] '>
         <img src={dealImage}/>
        
       </div>
       <Typography color='primary'>{homePageTitle}</Typography>
       
       </div>
  )
}

export default DealOfWeek
