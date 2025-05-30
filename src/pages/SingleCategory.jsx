import React ,{useState} from 'react'
import {  Menu, MenuItem, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextLink from '../components/Minor/TextLink';
import DealCard from '../components/cards/DealCard';
import PopularBrandCard from '../components/cards/PopularBrandWithText';
import Coupons_Deals from '../components/cards/Coupons_Deals';
import DealOfWeek from '../components/cards/DealOfWeek';
import List from '../components/Minor/list';
import Filter from '../components/Minor/Filter';
import ReviewCard from '../components/cards/ReviewCard';
const SingleCategory = () => {
    const ListItems = ['Beatyry & Spa', 'Things to do', 'Auto & Home', 'Food', 'Fashion', 'Electronics', 'Others']

  const [anchorEl, setAnchorEl] = useState(null);

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl); 
  return (
    <div>
       <div className="flex justify-between items-center px-4">
        <div>
          <Typography variant="body1" fontWeight="bold" className="text-lg">
            Clothing
          </Typography>
          <Typography>39 Deals 14 Coupons</Typography>
        </div>

        {/* Search & Sort Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleSortClick}
            className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-md"
          >
            Sort <ArrowDropDownIcon className="ml-1" />
          </button>

          {/* Sort Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleClose}>Sort by Popularity</MenuItem>
            <MenuItem onClick={handleClose}>Sort by Name</MenuItem>
            <MenuItem onClick={handleClose}>Sort by Newest</MenuItem>
          </Menu>
        </div>
      </div>
      <TextLink text="Clothing" colorText="deals worth wearing" link="" linkText="" />
            <div className='flex overflow-x-scroll'>
            {[...Array(4)].map((_, index) => (
                    <DealCard />
                ))}
                </div>
<div className='bg-[#592EA9] text-white my-4'>
    <p className='px-4 py-2'>Dress up with Cash Back</p>
            <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide ">
      {[...Array(4)].map((_, index) => (
        <PopularBrandCard key={index} />
      ))}
    </div>
    </div>
     <TextLink text="Coupons"colorText="& Deals" link="" linkText="View All"/>
          <div className='space-y-4'>
                {[...Array(4)].map((_, index) => (
                        <Coupons_Deals border={true}/>
                    ))}
                    </div>
                    <div className='mt-4 border-b pb-2'>

                                <List items={ListItems} direction='px-4 flex  gap-[20px] overflow-x-scroll whitespace-nowrap text-sm font-normal scrollbar-hide' />
                                </div>
                                <TextLink text="Deal of the " colorText="Week" link="" linkText="View All" />
            <div className='flex overflow-x-scroll gap-4 px-4'>
            {[...Array(4)].map((_, index) => (
                              <DealOfWeek />

                ))}
                </div>
                <Filter text="stores"/>
                      <div className='space-y-4'>
                            {[...Array(4)].map((_, index) => (
                                    <Coupons_Deals border={false}/>
                                ))}
                                </div>
                                <TextLink text="Public" colorText="Reviews" link="" linkText="" />
                                <div className='px-4'>
                                <ReviewCard/>
                                </div>
                                
    </div>
  )
}

export default SingleCategory
