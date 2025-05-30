import React, { useState } from 'react';
import BannerImage from '../assets/Coupons_deals.jpeg';
import TextLink from '../components/Minor/TextLink';
import SpecificBrand from '../components/cards/SpecificBrand';
import Coupons_Deals from '../components/cards/Coupons_Deals';
import CodeActivityCard from '../components/charts/lineBar';
import BarChartCard from '../components/charts/BarChart';
import DealCard from '../components/cards/DealCard';
import { LiaPercentageSolid } from "react-icons/lia";
import HeadingText from '../components/Minor/HeadingText';
import ReviewCard from '../components/cards/ReviewCard';
import FAQAccordion from '../components/Minor/Faq';
const StoreBranding = () => {
    const [showMore, setShowMore] = useState(false);

    // Sample promo codes data
    const promoCodes = [
        {
            title: "20% OFF Sitewide",
            type: "code",
            verified: "Verified today",
            uses: "42 uses today"
        },
        {
            title: "Free Shipping on Orders $35+",
            type: "deal",
            verified: "Verified today",
            uses: "18 uses today"
        },
        {
            title: "$10 OFF $50+ Grocery Order",
            type: "code",
            verified: "Verified yesterday",
            uses: "56 uses today"
        }
    ];
    const chartData = [
        { day: "M", value: 40 },
        { day: "T", value: 70 },
        { day: "W", value: 30 },
        { day: "T", value: 90 },
        { day: "F", value: 65 },
        { day: "S", value: 35 },
        { day: "Today", value: 50 },
      ];
    const activityData = [
        { value: 25 },
        { value: 33 },
        { value: 22 },
        { value: 27 },
        { value: 20 },
        { value: 25 },
        { value: 30 },
        { value: 35 },
        { value: 28 },
        { value: 32 },
        { value: 26 },
        { value: 20 },
      ];
    return (
        <div >
            <div className='flex gap-4 items-center mx-4'>
                <img
                    src={BannerImage}
                    className='rounded-sm max-w-[30%] min-h-[100px] object-cover'
                    alt="Walmart Promo Codes"
                />
                <p className='font-semibold text-xl'>Walmart Promo Codes & Coupons March 2025</p>
            </div>

            <div className='mt-2 mx-4'>
                <span className='inline-block'>
                    Last verified 4 minutes ago - 6 active community members tracking Target promo codes this past week.
                    <button
                        onClick={() => setShowMore(!showMore)}
                        className='text-[#592EA9] ml-1 hover:underline focus:outline-none'
                    >
                        {showMore ? 'Show less' : 'Show more'}
                    </button>
                </span>

                {/* Expandable content with transition */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${showMore ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className='space-y-3'>
                        {promoCodes.map((promo, index) => (
                            <div key={index} className='p-3 border border-gray-200 rounded-md bg-gray-50'>
                                <div className='flex justify-between items-center'>
                                    <span className='font-medium'>{promo.title}</span>
                                    <button className='text-[#592EA9] hover:underline'>
                                        {promo.type === 'code' ? 'Copy Code' : 'Get Deal'}
                                    </button>
                                </div>
                                <p className='text-sm text-gray-500 mt-1'>
                                    {promo.verified} - {promo.uses}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <TextLink text="Walmart" colorText="Offers" link="" linkText="" />
            <div className='border-b border-[#E5E5E5]'>
                <ul className='flex gap-4 items-center mx-4 '>
                    <li>
                        Best Codes
                    </li>
                    <li>
                        Best Deals
                    </li>
                    <li>
                        Best Offers
                    </li>
                </ul>
            </div>

            <p className='font-semibold mx-4 mt-4'> Today’s Walmart promo codes</p>

            <p className='mx-4 mb-4'>Find every active promo code, ranked by
                discount and verified in real time.</p>
                <div className='space-y-4'>
                  {[...Array(4)].map((_, index) => (
                                    <SpecificBrand border={true}/>
                                ))}
                                </div>
                    <div className='m-4'>
<p className='font-semibold text-base'>More Walmart Codes</p>
<p className='text-sm'>Explore the best Walmart offers that don’t 
require a code.</p>
                    </div>
                     <div className='space-y-4'>
                                {[...Array(2)].map((_, index) => (
                                        <Coupons_Deals border={true}/>
                                    ))}
                                    </div>
                                    <CodeActivityCard
        title="Code Activity"
        data={activityData}
        totalUses={11789}
      />
      <div className='m-4'>
<p className='font-semibold text-base'>When’s the best time to buy at
Walmart?</p>
<p className='text-sm'>Explore the best Walmart offers that don’t 
require a code.</p>
                    </div>
                    <BarChartCard
        data={chartData}
        title="480 Codes"
        subtitle="Best time to buy at Walmart"
        total="480 Codes"
      />
      <div className='m-4'>
<p className='font-semibold text-base'>When’s the best time to buy at
Walmart?</p>
<p className='text-sm'>Explore the best Walmart offers that don’t 
require a code.</p>
                    </div>
                    <div className='space-y-4'>
                    {[...Array(2)].map((_, index) => (
                                        <Coupons_Deals border={false}/>
                                    ))}
                                    </div>
                                    <div className='m-4'>
<p className='font-semibold text-base'>When’s the best time to buy at
Walmart?</p>
<p className='text-sm'>Explore the best Walmart offers that don’t 
require a code.</p>
                    </div>
                    <div className='flex overflow-x-scroll'>
            {[...Array(4)].map((_, index) => (
                    <DealCard />
                ))}
                </div>
                <HeadingText/>
                <div className='bg-[#F6F6F6] border border-[#E1E1E1] rounded-lg p-4 mx-2 flex justify-between items-center'>
                
                <div>
                <p>Coupons Available Today</p>
                <p className='text-xl font-semibold text-[#592EA9]'>600</p>
                </div>
                <LiaPercentageSolid className='text-[#592EA9] text-4xl'/>
             </div>
             <div className="pt-3 flex  justify-between mx-2 gap-4">
             <div className='bg-[#F6F6F6] border border-[#E1E1E1] rounded-lg p-4 w-full'>
                <p>Total Uses</p>
                <p className='text-xl font-semibold text-[#592EA9]'>600</p>
             </div>
             <div className='bg-[#F6F6F6] border border-[#E1E1E1] rounded-lg p-4 w-full'>
                <p>Last Used</p>
                <p className='text-xl font-semibold text-[#592EA9]'>30min ago</p>
             </div>
            </div>
            <div className="pt-3 flex  justify-between mx-2 gap-4">
             <div className='bg-[#F6F6F6] border border-[#E1E1E1] rounded-lg p-4 w-full'>
                <p>Total Uses</p>
                <p className='text-xl font-semibold text-[#592EA9]'>600</p>
             </div>
             <div className='bg-[#F6F6F6] border border-[#E1E1E1] rounded-lg p-4 w-full'>
                <p>Last Used</p>
                <p className='text-xl font-semibold text-[#592EA9]'>30min ago</p>
             </div>
            </div>
            <TextLink text="Shopping" colorText="& Policy" link="" linkText="" />
            <div className="pt-3 flex  justify-between mx-2 gap-4">
             <div className='bg-[#F6F6F6] border border-[#E1E1E1] rounded-lg p-4 w-full'>
                <p>Total Uses</p>
                <p className='text-xl font-semibold text-[#592EA9]'>600</p>
             </div>
             <div className='bg-[#F6F6F6] border border-[#E1E1E1] rounded-lg p-4 w-full'>
                <p>Last Used</p>
                <p className='text-xl font-semibold text-[#592EA9]'>30min ago</p>
             </div>
            </div>
            <div className="pt-3 flex  justify-between mx-2 gap-4">
             <div className='bg-[#F6F6F6] border border-[#E1E1E1] rounded-lg p-4 w-full'>
                <p>Total Uses</p>
                <p className='text-xl font-semibold text-[#592EA9]'>600</p>
             </div>
             <div className='bg-[#F6F6F6] border border-[#E1E1E1] rounded-lg p-4 w-full'>
                <p>Last Used</p>
                <p className='text-xl font-semibold text-[#592EA9]'>30min ago</p>
             </div>
            </div>
            <TextLink text="User" colorText="Reviews" link="" linkText="" />

<div className='p-4'>
    
    <ReviewCard />
</div>
<FAQAccordion/>
        </div>
    );
};

export default StoreBranding;