import React, { useEffect } from "react";
import Banner from "../components/Minor/Banner";
import Image from "../assets/banner-image.webp";
import TextLink from "../components/Minor/TextLink";
import Coupons_Deals from "../components/cards/Coupons_Deals";
import ReviewCard from "../components/cards/ReviewCard";
import DesktopCard from '../components/cards/DealsDesktopCard.jsx'
import { getDeals } from "../redux/deal/dealSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviews } from "../redux/review/reviewSlice.js";
import HeadingText from "../components/Minor/HeadingText.jsx";
import { getHomeAdminData } from '../redux/admin/homeAdminSlice';

const AllCoupons = () => {
  const dispatch = useDispatch();

  

  const { deals = [] } = useSelector((state) => state.deal);
  const { reviews = [] } = useSelector((state) => state.reviews);
const homeAdmin = useSelector((state) => state.homeAdmin) || {};
  const data = (homeAdmin.data && homeAdmin.data[0]) || {};
  useEffect(() => {
    dispatch(getDeals());
    dispatch(fetchReviews());
        dispatch(getHomeAdminData());
    
  }, [dispatch]);
  // Current date (without time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Filter expired deals
  const expiredDeals = deals.filter((deal) => {
    const expiry = new Date(deal.expiredDate);
    expiry.setHours(0, 0, 0, 0);
    return expiry < today;
  });

  // Filter active deals
  const activeDeals = deals.filter((deal) => {
    const expiry = new Date(deal.expiredDate);
    expiry.setHours(0, 0, 0, 0);
    return expiry >= today;
  });

  return (
    <>
    <div>
      <h1 className="font-semibold text-xl max-w-[80%] px-4">
        ALL DEALS & COUPONS CODES
      </h1>

      <Banner text="" colorText="" BgImage={data.allCouponsPageBanner} />

      <TextLink text="All" colorText="Offers" link="" linkText="" />
      <div className="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:justify-around">
        {activeDeals.map((deal) => (
          <Coupons_Deals key={deal._id} data={deal} border={true} />
          
        ))}
      </div>
      
      

      <TextLink text="Expired" colorText="Coupons" link="" linkText="" />
      <div className="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:justify-around">
        {expiredDeals.length > 0 ? (
          expiredDeals.map((deal) => (
            <Coupons_Deals
              key={deal._id}
              data={deal}
              border={true}
              disabled={true}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 px-4">
            No expired coupons found.
          </p>
        )}
      </div>

      <TextLink text=" User" colorText="Review" link="" linkText="" />

      <div className="p-4 flex gap-4 overflow-x-scroll">
        {reviews.length > 0 ? (
          reviews.map((review) => <ReviewCard key={review._id} data={review} />)
        ) : (
          <p>No reviews found.</p>
        )}
      </div>
  
    
    </div>
      <HeadingText
      title={data.allCouponsAboutHeading}
      content={data.allCouponsAboutDescription}
      isHtml={true}
       />
      </>
  );
};

export default AllCoupons;
