import React from 'react'
import Image from "../../assets/dealofweek.jpeg"
import { Typography } from '@mui/material'
const DealOfWeek = () => {
  return (
   <div className=' text-xs space-y-1 mx-4 w-[25%] min-w-[125px]'>
       <div className=' rounded-lg bg-white shadow-[0px_2px_10.3px_0px_rgba(0,0,0,0.25)] '>
         <img src={Image}/>
        
       </div>
       <Typography color='primary'>Upto 4%</Typography>
       
       </div>
  )
}

export default DealOfWeek
