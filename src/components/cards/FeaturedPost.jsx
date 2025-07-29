import React from 'react'
import Image from "../../assets/featurePost.png"
import { Typography ,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
const FeaturedPost = ({blog}) => {
        const navigate = useNavigate();
    
    const getFirst200Words = (htmlString) => {
        // Strip HTML and get plain text
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        const plainText = tempDiv.textContent || tempDiv.innerText || "";
      
        // Get first 200 words
        const truncated = plainText.split(' ').slice(0, 100).join(' ') + '...';
      
        // Sanitize it (optional but recommended)
        return DOMPurify.sanitize(truncated);
      };
      const handleClick =()=>{
        navigate(`/blogs`);
    
    
    }
  return (
    <div className='p-4 border-2 border-[#f1f1f1] rounded-lg mx-4'>
      <img src={Image} className='max-h-[300px] w-full mb-4'/>
      <span className='font-medium text-[15px]'><p >By</p><Typography color='primary'>Author</Typography></span>
      <p className='font-medium text-[15px]'>
        {new Date(blog.updatedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}
      </p>
      <Typography
  sx={{ fontSize: '13px' }}
  dangerouslySetInnerHTML={{ __html: getFirst200Words(blog.details) }}
/>
      <Button type="submit" variant="contained" color="black" sx={{color:'#fff', borderRadius:'7px',mt:2}} onClick={handleClick}> 
        See All
      </Button>
    </div>
  )
}

export default FeaturedPost
