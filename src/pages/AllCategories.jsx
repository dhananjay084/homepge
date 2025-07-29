import React, { useEffect, useState } from 'react';
import Banner from '../components/Minor/Banner';
import Image from "../assets/banner-image.webp";
import TextLink from '../components/Minor/TextLink';
import CategoryCard from '../components/cards/CategoryCard';
import HeadingText from '../components/Minor/HeadingText';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../redux/category/categorySlice';
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getHomeAdminData } from '../redux/admin/homeAdminSlice';

const AllCategories = () => {
  const dispatch = useDispatch();
  const { categories = [] } = useSelector((state) => state.category);

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
 const homeAdmin = useSelector((state) => state.homeAdmin) || {};
    const data = (homeAdmin.data && homeAdmin.data[0]) || {};
  const alphabet = ["All", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

  useEffect(() => {
    dispatch(getCategories());
            dispatch(getHomeAdminData());
    
  }, [dispatch]);

  useEffect(() => {
    filterCategoriesByLetter(selectedLetter);
  }, [categories, selectedLetter]);

  const filterCategoriesByLetter = (letter) => {
    if (!categories || categories.length === 0) {
      setFilteredCategories([]);
      return;
    }

    if (letter === "All") {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter((cat) =>
        cat.name?.toLowerCase().startsWith(letter.toLowerCase())
      );
      setFilteredCategories(filtered);
    }
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="overflow-x-hidden">
      {/* Banner */}
      <Banner 
        Text="Every day we the most interesting things" 
        ColorText="discuss" 
        BgImage={data.allCategoriesPageBanner} 
      />

      {/* Popular Categories */}
      <TextLink text="Popular Categories" colorText="" link="" linkText="" />
      <div className='px-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4'>
        {categories && categories.length > 0 ? (
          categories
            .filter(cat => cat.popularStore)
            .map(cat => (
              <CategoryCard key={cat._id} data={cat} />
            ))
        ) : (
          <p className="text-center w-full">No categories found.</p>
        )}
      </div>

      {/* Filter */}
      <div className="w-full px-4 md:px-8 py-2 flex flex-col gap-4 my-6">
        {/* Top Section */}
        <div className="flex justify-between items-center">
          <Typography variant="body1" fontWeight="bold" className="text-lg">
            See All <Typography color="primary" display="inline">categories</Typography>
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

            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Sort by Popularity</MenuItem>
              <MenuItem onClick={handleMenuClose}>Sort by Name</MenuItem>
              <MenuItem onClick={handleMenuClose}>Sort by Newest</MenuItem>
            </Menu>
          </div>
        </div>

        {/* Alphabet Filter */}
        <div className="w-full overflow-x-auto whitespace-nowrap no-scrollbar">
          <div className="flex gap-2">
            {alphabet.map((letter, idx) => (
              <button
                key={idx}
                onClick={() => handleLetterClick(letter)}
                className={`px-4 py-2 rounded-[10px] border ${
                  letter === selectedLetter
                    ? "bg-[#592EA9] text-white"
                    : "border-gray-400 text-gray-700"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All Categories */}
      <div className='px-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-10'>
        {filteredCategories.length > 0 ? (
          filteredCategories.map(cat => (
            <CategoryCard key={cat._id} data={cat} />
          ))
        ) : (
          <p className="text-center w-full col-span-full">No categories found.</p>
        )}
      </div>

      <HeadingText
      title={data.allCategoriesAboutHeading}
      content={data.allCategoriesAboutDescription}
      isHtml={true}
       />
    </div>
  );
};

export default AllCategories;
