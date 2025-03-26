import React from 'react'
import { Typography } from '@mui/material'
import { light } from '@mui/material/styles/createPalette'

const TextLink = ({text,colorText,link,linkText}) => {
  return (
    <div className='flex justify-between items-center p-4'>
      <span className='flex items-center gap-1 '>{text}<Typography color="primary"> {colorText} </Typography></span>
      <a className='decoration-solid text-[#592EA9] underline text-[10px]' href={`${link}`}> {linkText}</a>
    </div>
  )
}
TextLink.defaultProps ={
  text:'',
  colorText:'',
  link:'',
  linkText:''
}
export default TextLink
