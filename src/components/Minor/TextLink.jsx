import React from 'react'
import { Typography } from '@mui/material'

const TextLink = ({text,colorText,link,linkText}) => {
  return (
    <div className='flex justify-between items-center p-4'>
      <span className='flex items-center gap-1 '>{text}<Typography color="primary"> {colorText} </Typography></span>
      <a className='decoration-solid text-[#592EA9] underline' href={`${link}`}> {linkText}</a>
    </div>
  )
}

export default TextLink
