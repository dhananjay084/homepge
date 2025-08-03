import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Banner from '../components/Minor/Banner';
import Image from '../assets/banner-image.webp';
import { Typography } from '@mui/material';
import HeadingText from '../components/Minor/HeadingText';
import DealCard from '../components/cards/DealCard';
import { useSelector, useDispatch } from 'react-redux';
import { getDeals } from '../redux/deal/dealSlice';
import ReviewCard from '../components/cards/ReviewCard';
import { fetchReviews } from '../redux/review/reviewSlice.js';
import TextLink from '../components/Minor/TextLink';
import CouponModal from '../components/modals/couponModels.jsx'; 
import axios from 'axios';

const DealDetails = () => {
  const dispatch = useDispatch();
  const [dealDetails, setDealDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const { deals = [] } = useSelector((state) => state.deal);
  const { reviews = [] } = useSelector((state) => state.reviews);
  
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = () => {
    setModalOpen(true);
  };
  
  useEffect(() => {
    const fetchDealById = async () => {
      try {
        const res = await axios.get(`mycouponstock-production.up.railway.app/api/deals/${id}`);
        setDealDetails(res.data);
      } catch (err) {
        console.error('Error fetching deal:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDealById();
    }
  }, [id, category]);

  useEffect(() => {
    dispatch(getDeals());
    dispatch(fetchReviews());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center p-4">Loading deal details...</p>;
  }

  if (!dealDetails) {
    return <p className="text-center p-4 text-red-500">Deal not found.</p>;
  }

  return (
    <>
    <div>
      <Banner
        Text="Every day we the most interesting things"
        ColorText="discuss"
        BgImage={Image}
      />

      <div className="flex justify-between items-center p-4">
        <Typography color="primary">{dealDetails.homePageTitle}</Typography>
        { dealDetails.dealCategory ==='deal'?
        <button className="bg-[#592EA9] rounded-[10px] p-2 text-white">
          Shop Now
        </button>
        :
        <button className="bg-[#592EA9] rounded-[10px] p-2 text-white" onClick={handleCardClick}>
        Show Code
      </button>

}
      </div>

      <div className="px-4">
        <h2 className="font-semibold text-xl">{dealDetails.dealTitle}</h2>
      </div>

      <HeadingText
        title={dealDetails.dealTitle}
        isHtml={true}
        content={dealDetails.details}
      />

      <div className="flex overflow-x-scroll gap-4 p-4">
        {deals
          .filter(
            (deal) => deal.categorySelect === category && deal._id != id && deal.dealCategory ==='deal'
          )
          .map((deal) => (
            <DealCard key={deal._id} data={deal} />
          ))}
      </div>

      <HeadingText
        title={dealDetails.dealTitle}
        isHtml={true}
        content={dealDetails.dealDescription}
      />

      <TextLink text="Loft User" colorText="Reviews" link="" linkText="" />

      <div className="pt-0 p-4 flex gap-4 overflow-x-scroll">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review._id} data={review} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No reviews found.
          </p>
        )}
      </div>
    </div>
    <CouponModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={dealDetails}
      />
    </>
  );
};

export default DealDetails;
