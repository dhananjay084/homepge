import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ data }) => {
  if (!data) return null;
  const navigate = useNavigate();

  const { image, name } = data;
 const handleClick=()=>{
  navigate(`/category?name=${name}`);

 }
  return (
    <div className="text-xs text-center space-y-1 w-full cursor-pointer" onClick={handleClick}>
      <div className="p-1 rounded-2xl bg-white shadow-[0px_2px_10.3px_0px_rgba(0,0,0,0.25)] w-full aspect-square flex items-center justify-center overflow-hidden">
        <img
          src={image || '/default-category.jpg'}
          className="w-full h-full rounded-2xl object-fill"
          alt={name || 'Category'}
        />
      </div>
      <p className="px-2 truncate">{name || 'Unnamed'}</p>
    </div>
  );
};

export default CategoryCard;
