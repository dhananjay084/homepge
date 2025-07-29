import React from 'react';

const ReviewCard = ({ data }) => {
  const { name, designation, desc, image } = data || {};
  
  return (
    <div className='flex gap-4 shadow-2xl border border-[#f1f1f1] p-4 min-w-[350px] max-w-[350px]'>
      <div className='max-w-1/2'>
        <p className='text-[10px]'>{desc}</p>
        <p className='font-semibold text-[12px]'>{name}</p>
        <p className='text-[7px]'>{designation}</p>
      </div>
      <img src={image} alt={name} className='max-w-1/2 rounded-lg object-cover' />
    </div>
  );
};

export default ReviewCard;
