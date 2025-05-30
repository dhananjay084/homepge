import React from 'react'
import Banner from '../components/Minor/Banner';
import Image from "../assets/banner-image.webp";
import TextLink from '../components/Minor/TextLink';
import CategoryCard from '../components/cards/CategoryCard';
import Filter from "../components/Minor/Filter";
import HeadingText from '../components/Minor/HeadingText';

const AllCategories = () => {
    const category = ['clothing', 'food', 'beauty', 'travel', 'gifts', 'electronics', 'cafes', 'shoes','other']
    const Allcategory = ['clothing', 'food', 'beauty', 'travel', 'gifts', 'electronics', 'cafes', 'shoes','other','clothing', 'food', 'beauty', 'travel', 'gifts', 'electronics', 'cafes', 'shoes','other','clothing', 'food', 'beauty', 'travel', 'gifts', 'electronics', 'cafes']


  return (
    <div>
      <Banner Text="Every day we  the most interesting things" ColorText="discuss" BgImage={Image} />
      <TextLink text="Popular Categories" colorText="" link="" linkText="" />
            <div className='px-4 flex flex-wrap gap-4 justify-between'>
                {
                    category.map((val) => {
                        return (
                            <CategoryCard val={val} />
                        )
                    })
                }
            </div>
            <Filter text="categories"/>
            <div className='px-4 flex flex-wrap gap-4 justify-between'>
                {
                    Allcategory.map((val) => {
                        return (
                            <CategoryCard val={val} />
                        )
                    })
                }
            </div>
            <HeadingText/>
    </div>
  )
}

export default AllCategories
