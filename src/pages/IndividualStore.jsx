import React from 'react'
import TextLink from '../components/Minor/TextLink';
import List from '../components/Minor/list';
import Coupons_Deals from '../components/cards/Coupons_Deals';
import PopularBrandCard from '../components/cards/PopularBrandWithText';
import DealCard from '../components/cards/DealCard';
import HeadingText from '../components/Minor/HeadingText';
import BarChartCard from '../components/charts/BarChart';
import { LiaPercentageSolid } from "react-icons/lia";
import ReviewCard from '../components/cards/ReviewCard';
import FAQAccordion from '../components/Minor/Faq';
const IndividualStore = () => {
    const ListItems = ['Beatyry & Spa', 'Things to do', 'Auto & Home']
    const chartData = [
        { day: "M", value: 40 },
        { day: "T", value: 70 },
        { day: "W", value: 30 },
        { day: "T", value: 90 },
        { day: "F", value: 65 },
        { day: "S", value: 35 },
        { day: "Today", value: 50 },
      ];
  return (
    <div>
                  <TextLink text="Walmart" colorText="Offers" link="" linkText="" />
                    <div className='border-b pb-2 mb-4'>
                  
                                                  <List items={ListItems} direction='px-4 flex  gap-[20px] overflow-x-scroll whitespace-nowrap text-sm font-normal scrollbar-hide' />
                                                  </div>
                  <TextLink text="Top Codes" colorText="" link="" linkText="" />
                    <div className='space-y-4'>
                              {[...Array(4)].map((_, index) => (
                                      <Coupons_Deals border={true}/>
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
    <TextLink text="Today's Top" colorText="Deals" link="/home" linkText="View All" />
            <div className='flex overflow-x-scroll'>
            {[...Array(4)].map((_, index) => (
                    <DealCard />
                ))}
                </div>
                <HeadingText/>
                <BarChartCard
        data={chartData}
        title="480 Codes"
        subtitle="Best time to buy at Walmart"
        total="480 Codes"
      />
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
                  <div className='px-4'>
      <ReviewCard/>
  
      </div>
      <FAQAccordion/>
    </div>
  )
}

export default IndividualStore
