import React from 'react'
import Category from '../../assets/category.jpeg';
const CategoryCard = () => {
  return (
    <div className='text-center text-xs space-y-1'>
    <div className=' p-2 rounded-lg bg-white shadow-[0px_2px_10.3px_0px_rgba(0,0,0,0.25)]'>
      <img src={Category} className='max-w-[75px]'/>
     
    </div>
    <p>Clothing</p>
    </div>
  )
}

export default CategoryCard
