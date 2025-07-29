import React ,{useState,useEffect} from 'react'
import {  Menu, MenuItem, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TextLink from '../components/Minor/TextLink';
import DealCard from '../components/cards/DealCard';
import PopularBrandCard from '../components/cards/PopularBrandWithText';
import Coupons_Deals from '../components/cards/Coupons_Deals';
import DealOfWeek from '../components/cards/DealOfWeek';
import { fetchReviews } from '../redux/review/reviewSlice.js';
import ReviewCard from '../components/cards/ReviewCard';
import { getDeals } from '../redux/deal/dealSlice';
import { useSelector, useDispatch } from 'react-redux';
import {  useSearchParams } from 'react-router-dom';


const SingleCategory = () => {
  const dispatch = useDispatch();
  const { reviews = [] } = useSelector((state) => state.reviews);
  const [anchorEl, setAnchorEl] = useState(null);
   const [searchParams] = useSearchParams();
    const category = searchParams.get('name');
  const { deals = [] } = useSelector((state) => state.deal);
  const filteredDeals = deals.filter(deal => deal.categorySelect === category);
  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    dispatch(getDeals());
        dispatch(fetchReviews()); 
    
  }, [dispatch]);
  const open = Boolean(anchorEl); 
  return (
    <div>
       <div className="flex justify-between items-center px-4">
        <div>
          <Typography variant="body1" fontWeight="bold" className="text-lg">
            {category}
          </Typography>
          <Typography>{filteredDeals.length} Offers</Typography>
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
      <TextLink text={category} colorText="deals worth wearing" link="" linkText="" />
            <div className='flex overflow-x-scroll'>
            {[...Array(4)].map((_, index) => (
                    <DealCard />
                ))}
                 {filteredDeals
            .filter(store => store.dealCategory ==='deal')
          
          .map(deal => (
            <DealCard key={deal._id} data={deal} />
          ))}
                </div>
<div className='bg-[#592EA9] text-white my-4'>
    <p className='px-4 py-2'>{category} Coupon </p>
            <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide ">
            {filteredDeals
            .filter(store => store.dealCategory ==='coupon')
            .map(store => (
              <PopularBrandCard key={store._id} data={store} />
            ))}
     
    </div>
    </div>
     <TextLink text="Coupons"colorText="& Deals" link="" linkText="View All"/>
          <div className='space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:justify-around '>
                
                     {filteredDeals
                              
                              .map(deal => (
                                <Coupons_Deals key={deal._id} data={deal} border={true} />
                              ))}
                    </div>
                 
                                <TextLink text="Deal of the " colorText="Week" link="" linkText="View All" />
            <div className='flex overflow-x-scroll gap-4 px-4'>
            {[...Array(4)].map((_, index) => (
                              <DealOfWeek />

                ))}
                {filteredDeals
          .filter(deal => deal.dealType === "Deal of week")
          .map(deal => (
            <DealOfWeek key={deal._id} data={deal} />
          ))}
                </div>
                      {/* <div className='space-y-4'>
                            {[...Array(4)].map((_, index) => (
                                    <Coupons_Deals border={false}/>
                                ))}
                                </div> */}
                                <TextLink text="Public" colorText="Reviews" link="" linkText="" />
                                <div className="p-4 flex gap-4 overflow-x-scroll">
  {reviews.length > 0 ? (
    reviews.map((review) => (
      <ReviewCard key={review._id} data={review} />
    ))
  ) : (
    <p>No reviews found.</p>
  )}
</div>
                                
    </div>
  )
}

export default SingleCategory
