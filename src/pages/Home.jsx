import React from 'react';
import List from '../components/Minor/list';
import TextLink from '../components/Minor/TextLink';
import Banner from '../components/Minor/Banner';
import DealCard from '../components/cards/DealCard';
import BrandCard from '../components/cards/BrandsCard';
import CategoryCard from '../components/cards/CategoryCard';
import PopularBrandCard from '../components/cards/PopularBrandCard';
import PopularStors from "../components/cards/PopularStores";
import Coupons_Deals from '../components/cards/Coupons_Deals';
import BankOffer from '../components/cards/BankOffer';
import NewsLetter from '../components/Minor/NewsLetter';
import ReviewCard from '../components/cards/ReviewCard';
import FeaturedPost from '../components/cards/FeaturedPost';
import DealOfWeek from '../components/cards/DealOfWeek';
import Image from "../assets/banner-image.webp";

import FAQ from "../components/Minor/Faq";
const Home = () => {
    const ListItems = ['Beatyry & Spa', 'Things to do', 'Auto & Home', 'Food', 'Fashion', 'Electronics', 'Others']
    const category = ['clothing', 'food', 'beauty', 'travel', 'gifts', 'electronics', 'cafes', 'shoes','other']
    return (
        <div>
            <List items={ListItems} direction='px-4 flex  gap-[20px] overflow-x-scroll whitespace-nowrap text-sm font-normal scrollbar-hide' />
            <Banner Text="Every day we  the most interesting things" ColorText="discuss" BgImage={Image}  />
            <TextLink text="Today's Top" colorText="Deals" link="/home" linkText="View All" />
            <div className='flex overflow-x-scroll'>
            {[...Array(4)].map((_, index) => (
                    <DealCard />
                ))}
                </div>
            <TextLink text="Brands" colorText="" link="/home" linkText="View All" />
            <div className='flex overflow-x-scroll'>
            {[...Array(4)].map((_, index) => (
                              <BrandCard />

                ))}
                </div>
            <TextLink text="Popular Categories" colorText="" link="/allcategories" linkText="View All" />
            <div className='px-4 flex flex-wrap gap-4 justify-between'>
                {
                    category.map((val) => {
                        return (
                            <CategoryCard val={val} />
                        )
                    })
                }
            </div>
            <TextLink text="Popular" colorText="Brands" link="/home" linkText="View All" />
            <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide">
      {[...Array(4)].map((_, index) => (
        <PopularBrandCard key={index} />
      ))}
    </div>

            <TextLink text="Hot" colorText="Deals" link="/home" linkText="View All" />
            <div className='flex overflow-x-scroll'>
            {[...Array(4)].map((_, index) => (
                              <DealCard />

                ))}
                </div>
            <TextLink text="Popular" colorText="Stores" link="/home" linkText="View All" />
            <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide">
      {[...Array(4)].map((_, index) => (
        <PopularStors key={index} />
      ))}
    </div>
            <TextLink text="Coupons" colorText="& Deals" link="/allcoupons" linkText="View All" />
            <div className='space-y-4'>
            {[...Array(4)].map((_, index) => (
                    <Coupons_Deals />
                ))}
                </div>
            
            <TextLink text="Bank" colorText="Offers" link="" linkText="" />
            <div className='px-4 grid grid-cols-5 gap-4'>

                {[...Array(5)].map((_, index) => (
                              <BankOffer />

                ))}
            </div>
            <TextLink text="Cash Back &" colorText="Deals" link="/home" linkText="View All" />
            <div className='flex overflow-x-scroll'>
            {[...Array(4)].map((_, index) => (
                              <DealCard />

                ))}
                </div>
            <NewsLetter />
            <TextLink text="Public" colorText="Reviews" link="" linkText="" />

            <div className='p-4'>
                
                <ReviewCard />
            </div>
            <TextLink text="Featured" colorText="Post" link="" linkText="" />
            <FeaturedPost />
            <TextLink text="Deal of the " colorText="Week" link="" linkText="View All" />
            <div className='flex overflow-x-scroll gap-4 px-4'>
            {[...Array(4)].map((_, index) => (
                              <DealOfWeek />

                ))}
                </div>
            <FAQ/>
        </div>
    )
}

export default Home
