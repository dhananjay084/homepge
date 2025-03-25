import React ,{useState}from 'react';
import Image from "../../assets/NewsLetter.png"
import { Typography } from '@mui/material';
import { TextField, Button, Box } from "@mui/material";
const NewsLetter = () => {
    const [inputValue, setInputValue] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Submitted: ${inputValue}`);
        setInputValue("");
      };
  return (
    <div className='mt-8'>
      <img className='mx-auto' src={Image}/>
      <div className='max-w-[70%] mx-auto'>
        <p className='font-medium text-[12px]'>Get our weekly</p>
        <p className='text-[20px] font-semibold'>NEWSLETTER</p>
        <p className='text-[12px]'>
        Get weekly updates on the newest design stories, case studies and tips right in your mailbox.
        </p>
        <Typography color='primary' sx={{fontSize:'12px'}}> Subscribe now!</Typography>
        <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ mt: 2 ,borderRadius:'50px',textAlign:'center'}}
    >
      <TextField
        label="Enter something"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type="submit" variant="contained" color="black" sx={{color:'#fff', borderRadius:'7px',mt:2}}> 
        Submit
      </Button>
    </Box>
      </div>
    </div>
  )
}

export default NewsLetter
