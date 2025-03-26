import { Typography } from '@mui/material'
import React from 'react'

const HeadingText = () => {
  return (
    <div className='my-4 shadow-[0px_4px_6px_rgba(103,103,103,0.25)] max-w-[95%] p-4 mx-auto border-2 rounded-lg border-[#f1f1f1]'>
        <Typography sx={{fontWeight:500,fontSize:'15px'}} >About All Mercents</Typography>
        <Typography sx={{fontSize:'13px'}}><span className='font-medium'>Exclusions:</span>odor amet, consectetuer adipiscing elit. Ornare parturient in ultricies nisl vitae. Neque lobortis montes tincidunt vestibulum molestie ligula sed dolor. Class molestie dis condimentum molestie facilisis mi ipsum dolor. Mauris justo torquent per rhoncus a. Etiam nullam amet rhoncus torquent molestie <span className='text-[#592EA9] decoration-solid'>see more</span> </Typography>
      
    </div>
  )
}

export default HeadingText
