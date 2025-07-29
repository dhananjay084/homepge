import React, { useState, useEffect } from 'react';
import Image from "../../assets/NewsLetter.png";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { subscribeUser, resetSubscriberState } from "../../redux/newsletter/newsletterSlice";


const NewsLetter = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.newsletter);


  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      dispatch(subscribeUser({ email: inputValue }));
    }
  };

  useEffect(() => {
    if (success) {
      alert("Thanks for subscribing!");
      setInputValue("");
      dispatch(resetSubscriberState());
    } else if (error) {
      alert(error);
    }
  }, [success, error, dispatch]);

  return (
    <div className='mt-8'>
      <img className='mx-auto' src={Image} alt="Newsletter" />
      <div className='max-w-[70%] mx-auto'>
        <p className='font-medium text-[12px]'>Get our weekly</p>
        <p className='text-[20px] font-semibold'>NEWSLETTER</p>
        <p className='text-[12px]'>
          Get weekly updates on the newest design stories, case studies and tips right in your mailbox.
        </p>
        <Typography color='primary' sx={{ fontSize: '12px' }}>Subscribe now!</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, textAlign: 'center' }}>
          <TextField
            label="Enter your email"
            variant="outlined"
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button type="submit" variant="contained" color="black" sx={{ color: '#fff', borderRadius: '7px', mt: 2 }}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default NewsLetter;
