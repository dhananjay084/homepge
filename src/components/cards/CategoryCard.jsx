import React from 'react';
import Category from '../../assets/category.jpeg';

const CategoryCard = () => {
  return (
    <div className="text-center text-xs space-y-1">
      <div className="p-1 rounded-2xl bg-white shadow-[0px_2px_10.3px_0px_rgba(0,0,0,0.25)] w-[75px] h-[75px] flex items-center justify-center overflow-hidden">
        <img src={Category} className="w-full h-full  rounded-2xl" alt="Category" />
      </div>
      <p>Clothing</p>
    </div>
  );
};

export default CategoryCard;
