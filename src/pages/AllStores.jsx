// src/pages/AllStores.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/Minor/Banner';
import TextLink from '../components/Minor/TextLink';
import Image from "../assets/banner-image.webp";
import HeadingText from '../components/Minor/HeadingText';
import { getStores } from '../redux/store/storeSlice';
import PopularBrandCard from '../components/cards/PopularBrandWithTitle';
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getHomeAdminData } from '../redux/admin/homeAdminSlice';

const AllStores = () => {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.store);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const open = Boolean(anchorEl);
  const homeAdmin = useSelector((state) => state.homeAdmin) || {};
    const data = (homeAdmin.data && homeAdmin.data[0]) || {};

  // Fetch all stores on mount
  useEffect(() => {
    dispatch(getStores());
            dispatch(getHomeAdminData());
    
  }, [dispatch]);

  // Handle category (alphabet) click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const categories = ["All", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

  // Filtered stores logic
  const filteredStores =
    selectedCategory === "All"
      ? stores
      : stores?.filter((store) =>
          store.storeName?.toLowerCase().startsWith(selectedCategory.toLowerCase())
        );

  return (
    <div>
      <Banner Text="Every day we the most interesting things" ColorText="discuss" BgImage={data.allStoresPageBanner} />
      <TextLink text="Popular" colorText="Stores" link="" linkText="" />

      {loading && <p className='text-center text-lg font-medium'>Loading stores...</p>}
      {error && <p className='text-center text-red-600'>Error: {error}</p>}

      {/* === Popular Stores (Always show popular, not filtered) === */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4 mb-6'>
        {Array.isArray(stores) &&
          stores.filter(store => store.popularStore).map(store => (
            <PopularBrandCard key={store._id} data={store} />
          ))}
      </div>

      {/* === Filter Bar === */}
      <div className="w-full px-4 md:px-8 py-2 flex flex-col gap-4 my-4">
        <div className="flex justify-between items-center">
          <Typography variant="body1" fontWeight="bold" className="text-lg">
            See All <Typography color="primary" display="inline">stores</Typography>
          </Typography>

          <div className="flex gap-2">
            <IconButton className="!bg-[#592EA9] !rounded-lg hover:opacity-80">
              <SearchIcon className="text-white" />
            </IconButton>

            <button
              onClick={handleSortClick}
              className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-md"
            >
              Sort <ArrowDropDownIcon className="ml-1" />
            </button>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Sort by Popularity</MenuItem>
              <MenuItem onClick={handleClose}>Sort by Name</MenuItem>
              <MenuItem onClick={handleClose}>Sort by Newest</MenuItem>
            </Menu>
          </div>
        </div>

        {/* Alphabet Buttons */}
        <div className="w-full overflow-x-auto whitespace-nowrap no-scrollbar">
          <div className="flex gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-[10px] border ${
                  category === selectedCategory
                    ? "bg-[#592EA9] text-white"
                    : "border-gray-400 text-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === Filtered Stores Only === */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4 mb-10'>
        {Array.isArray(filteredStores) && filteredStores.length === 0 && !loading ? (
          <p className='text-center col-span-full text-gray-600'>No stores found.</p>
        ) : (
          filteredStores?.map((store) => (
            <PopularBrandCard key={store._id} data={store} />
          ))
        )}
      </div>

      <HeadingText
      title={data.allStoresAboutHeading}
      content={data.allStoresAboutDescription}
      isHtml={true}
       />
    </div>
  );
};

export default AllStores;
