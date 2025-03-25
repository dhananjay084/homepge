import React from 'react'
import Image from "../../assets/user.jpeg";
import Stars from "../../assets/Stars.png"
const ReviewCard = () => {
    return (
        <div className='flex gap-4 shadow-2xl border border-[#f1f1f1] p-4 w-full'>
            <div className='max-w-1/2'>
                <img src={Stars} />
                <p className='text-[10px]'> "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!"</p>
                <p className='font-semibold text-[12px]'>John D.</p>
                <p className='text-[7px]'>Company CEO</p>
            </div>
            <img src={Image} className='max-w-1/2 rounded-lg' />
        </div>
    )
}

export default ReviewCard
