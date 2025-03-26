import React from 'react'
import Banner from '../components/Minor/Banner';
import Image from "../assets/banner-image.webp";
import TextLink from '../components/Minor/TextLink';
import Coupons_Deals from '../components/cards/Coupons_Deals';
import ReviewCard from '../components/cards/ReviewCard';
import List from '../components/Minor/list';
import FAQ from "../components/Minor/Faq"
const AllCoupons = () => {
    const ListItems = ['Beatyry & Spa', 'Things to do', 'Auto & Home', 'Food', 'Fashion', 'Electronics', 'Others']

  return (
    <div>
      <h1 className='font-semibold text-xl max-w-[80%] px-4' >WALLMART PROMO CODES & COUPONS</h1>
      <Banner text="" colorText="" BgImage={Image} />
      <TextLink text="Top"colorText="Offers" link="" linkText=""/>
      <div className='space-y-4'>
            {[...Array(4)].map((_, index) => (
                    <Coupons_Deals border={true}/>
                ))}
                </div>
      <TextLink text="Expired"colorText="Coupons" link="" linkText=""/>
      <div className='space-y-4'>
            {[...Array(4)].map((_, index) => (
                    <Coupons_Deals border={true} disabled={true}/>
                ))}
                </div>
      <TextLink text="Wallmart User"colorText="Review" link="" linkText=""/>
     
      <div className='p-4'>
                
                <ReviewCard />
            </div>
      <p className='font-semibold text-[14px] my-2 mx-4'>Similar Stores</p>
      <List items={ListItems} direction='px-4   text-sm font-normal space-y-4 ' />
      <p className='font-semibold text-[14px] my-2 mx-4'>Popular Stores</p>
      <List items={ListItems} direction='px-4   text-sm font-normal space-y-4 ' />
 <FAQ/> 
    </div>
  )
}

export default AllCoupons
