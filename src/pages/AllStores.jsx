import React from 'react'
import Banner from '../components/Minor/Banner';
import TextLink from '../components/Minor/TextLink';
import Image from "../assets/banner-image.webp";
import DealOfWeek from '../components/cards/DealOfWeek';
import Filter from '../components/Minor/Filter';
import HeadingText from '../components/Minor/HeadingText';
const AllStores = () => {
  return (
    <div>
                  <Banner Text="Every day we  the most interesting things" ColorText="discuss" BgImage={Image}  />
                  <TextLink text="Popular" colorText="Stores" link="" linkText="" />
                  <div className='flex flex-wrap justify-between mx-2 gap-2'>
                  {[...Array(6)].map((_, index) => (
                              <DealOfWeek />

                ))}
                </div>
                <Filter text="stores"/>
                <div className='flex flex-wrap justify-between mx-2'>
                  {[...Array(24)].map((_, index) => (
                              <DealOfWeek />

                ))}
                </div>
                <HeadingText/>
    </div>
  )
}

export default AllStores
