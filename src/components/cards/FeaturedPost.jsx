import React from 'react'
import Image from "../../assets/featurePost.png"
import { Typography ,Button} from '@mui/material'
const FeaturedPost = () => {
  return (
    <div className='p-4 border-2 border-[#f1f1f1] rounded-lg mx-4'>
      <img src={Image} className='max-h-[200px] w-full mb-4'/>
      <span className='font-medium text-[15px]'><p >By</p><Typography color='primary'>John Doe</Typography></span>
      <p className='font-medium text-[15px]'>May 23 ,2022</p>
      <p className='text-[16px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, .</p>
      <p className='text-[14px]'>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
      <Button type="submit" variant="contained" color="black" sx={{color:'#fff', borderRadius:'7px',mt:2}}> 
        Read More
      </Button>
    </div>
  )
}

export default FeaturedPost
