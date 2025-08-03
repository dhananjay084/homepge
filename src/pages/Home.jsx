// src/pages/Home.jsx
import React, { useEffect } from "react";
// import List from "../components/Minor/list";
import TextLink from "../components/Minor/TextLink";
import Banner from "../components/Minor/Banner";
import DealCard from "../components/cards/DealCard";
import BrandCard from "../components/cards/BrandsCard";
import CategoryCard from "../components/cards/CategoryCard.jsx";
import PopularBrandCard from "../components/cards/PopularBrandCard";
import PopularStors from "../components/cards/PopularStores";
import Coupons_Deals from "../components/cards/Coupons_Deals";
import DesktopCard from "../components/cards/DealsDesktopCard.jsx";
import NewsLetter from "../components/Minor/NewsLetter";
import ReviewCard from "../components/cards/ReviewCard";
import FeaturedPost from "../components/cards/FeaturedPost";
import DealOfWeek from "../components/cards/DealOfWeek";
import FAQ from "../components/Minor/Faq";
import BannerCard from "../components/cards/BannerCards.jsx";
import DesktopStoreCard from "../components/cards/StoreDesktopCard.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getDeals } from "../redux/deal/dealSlice";
import { getStores } from "../redux/store/storeSlice";
import { getCategories } from "../redux/category/categorySlice";
import { fetchReviews } from "../redux/review/reviewSlice.js";
import { fetchBlogs } from "../redux/blog/blogSlice";
import { getHomeAdminData } from "../redux/admin/homeAdminSlice";

const Home = () => {
  const dispatch = useDispatch();

  const { deals = [] } = useSelector((state) => state.deal);
  const { stores = [] } = useSelector((state) => state.store);
  const { categories = [] } = useSelector((state) => state.category);
  const { reviews = [] } = useSelector((state) => state.reviews);
  const { blogs = [], loading } = useSelector((state) => state.blogs || {}); // fixed destructuring with default
  const homeAdmin = useSelector((state) => state.homeAdmin) || {};
  const data = (homeAdmin.data && homeAdmin.data[0]) || {};

  useEffect(() => {
    dispatch(getDeals());
    dispatch(getStores());
    dispatch(getCategories());
    dispatch(fetchReviews());
    dispatch(getHomeAdminData());
    dispatch(fetchBlogs());
  }, [dispatch]);

  // Safe helpers to avoid runtime if non-array sneaks in
  const safeFilter = (arr, fn) => (Array.isArray(arr) ? arr.filter(fn) : []);
  const safeMap = (arr, fn) => (Array.isArray(arr) ? arr.map(fn) : []);

  return (
    <div>
      <div className="lg:hidden">
        <Banner
          Text="Every day we the most interesting things"
          ColorText="discuss"
          BgImage={data.homepageBanner}
        />
      </div>

      <div className="lg:flex flex-wrap gap-4 p-4 justify-center lg:justify-between hidden">
        {Array.isArray(data.bannerDeals) &&
          data.bannerDeals.map((deal) => (
            <div className="w-full sm:w-[48%] lg:w-[32%]" key={deal._id}>
              <BannerCard data={deal} />
            </div>
          ))}
      </div>

      {/* Today's Top Deals */}
      <TextLink
        text="Today's Top"
        colorText="Deals"
        link="/allcoupons"
        linkText="View All"
      />
      <div className="md:flex overflow-x-scroll gap-4 px-4 hidden">
        {safeFilter(deals, (deal) =>
          deal?.showOnHomepage &&
          deal?.dealType === "Today's Top Deal" &&
          deal?.dealCategory === "deal"
        ).map((deal) => (
          <DesktopCard key={deal._id} data={deal} />
        ))}
      </div>
      <div className="flex overflow-x-scroll gap-4 md:hidden">
        {safeFilter(deals, (deal) =>
          deal?.showOnHomepage &&
          deal?.dealType === "Today's Top Deal" &&
          deal?.dealCategory === "deal"
        ).map((deal) => (
          <DealCard key={deal._id} data={deal} />
        ))}
      </div>

      {/* Brands */}
      <TextLink text="Brands" colorText="" link="/allstores" linkText="View All" />
      <div className="flex overflow-x-scroll md:hidden">
        {safeFilter(stores, (store) => store?.showOnHomepage && store?.storeType === "Brands").map((store) => (
          <BrandCard key={store._id} data={store} />
        ))}
      </div>
      <div className="md:flex overflow-x-scroll hidden px-4 gap-4">
        {safeFilter(stores, (store) => store?.showOnHomepage && store?.storeType === "Brands").map((store) => (
          <DesktopStoreCard key={store._id} data={store} />
        ))}
      </div>

      {/* Categories */}
      <TextLink text="Popular Categories" colorText="" link="/allcategories" linkText="View All" />
      <div className="px-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-10">
        {Array.isArray(categories) && categories.length > 0 ? (
          safeFilter(categories, (cat) => cat?.showOnHomepage).map((cat) => (
            <CategoryCard key={cat._id} data={cat} />
          ))
        ) : (
          <p className="text-center w-full">No categories found.</p>
        )}
      </div>

      {/* Popular Brands */}
      <TextLink text="Popular" colorText="Brands" link="/allstores" linkText="View All" />
      <div className="flex overflow-x-auto space-x-4 p-4 pt-0 scrollbar-hide md:hidden">
        {safeFilter(stores, (store) => store?.showOnHomepage && store?.storeType === "Popular").map((store) => (
          <PopularBrandCard key={store._id} data={store} />
        ))}
      </div>
      <div className="md:flex overflow-x-auto space-x-4 p-4 pt-0 scrollbar-hide hidden px-4">
        {safeFilter(stores, (store) => store?.showOnHomepage && store?.storeType === "Popular").map((store) => (
          <DesktopStoreCard key={store._id} data={store} />
        ))}
      </div>

      <div className="hidden md:block">
        <Banner
          Text="Every day we the most interesting things"
          ColorText="discuss"
          BgImage={data.midHomepageBanner}
        />
      </div>

      {/* Hot Deals */}
      <TextLink text="Hot" colorText="Deals" link="/allcoupons" linkText="View All" />
      <div className="flex overflow-x-scroll md:hidden">
        {safeFilter(deals, (deal) =>
          deal?.showOnHomepage &&
          deal?.dealType === "Hot" &&
          deal?.dealCategory === "deal"
        ).map((deal) => (
          <DealCard key={deal._id} data={deal} />
        ))}
      </div>
      <div className="md:flex overflow-x-scroll gap-4 hidden px-4">
        {safeFilter(deals, (deal) =>
          deal?.showOnHomepage &&
          deal?.dealType === "Hot" &&
          deal?.dealCategory === "deal"
        ).map((deal) => (
          <DesktopCard key={deal._id} data={deal} />
        ))}
      </div>

      {/* Popular Stores */}
      <TextLink text="Popular" colorText="Stores" link="/allstores" linkText="View All" />
      <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide">
        {safeFilter(stores, (store) =>
          store?.showOnHomepage && store?.storeType === "Popular Store"
        ).map((store) => (
          <PopularStors key={store._id} data={store} />
        ))}
      </div>

      {/* Coupons & Deals */}
      <TextLink text="Coupons" colorText="& Deals" link="/allcoupons" linkText="View All" />
      <div className="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:justify-around">
        {safeFilter(deals, (deal) =>
          deal?.showOnHomepage &&
          deal?.dealType === "Coupons/Deals" &&
          deal?.dealCategory === "coupon"
        ).map((deal) => (
          <Coupons_Deals key={deal._id} data={deal} />
        ))}
      </div>

      {/* Newsletter + Featured Post */}
      <div className="md:flex md:justify-around md:items-center">
        <div className="md:w-1/2">
          <NewsLetter />
        </div>
        <div className="md:w-1/2">
          <TextLink text="Featured" colorText="Post" link="" linkText="" />
          {safeFilter(blogs, (blog) => blog?.featuredPost).map((blog) => (
            <FeaturedPost key={blog._id} blog={blog} />
          ))}
        </div>
      </div>

      {/* Reviews */}
      <TextLink text="Public" colorText="Reviews" link="" linkText="" />
      <div className="p-4 flex gap-4 overflow-x-scroll">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review) => <ReviewCard key={review._id} data={review} />)
        ) : (
          <p>No reviews found.</p>
        )}
      </div>

      {/* Deal of the Week */}
      <TextLink text="Deal of the " colorText="Week" link="/allcoupons" linkText="View All" />
      <div className="flex overflow-x-scroll gap-4 px-4">
        {safeFilter(deals, (deal) =>
          deal?.showOnHomepage &&
          deal?.dealType === "Deal of week" &&
          deal?.dealCategory === "deal"
        ).map((deal) => (
          <DealOfWeek key={deal._id} data={deal} />
        ))}
      </div>

      <FAQ data={data.faqs} />
    </div>
  );
};

export default Home;
