// src/pages/AllStores.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/Minor/Banner';
import TextLink from '../components/Minor/TextLink';
// Image import might be unused if Banner uses data.allStoresPageBanner, keeping for now
import Image from "../assets/banner-image.webp";
import HeadingText from '../components/Minor/HeadingText';
import { getStores, searchStores, clearSearchResults } from '../redux/store/storeSlice'; // Import searchStores and clearSearchResults
import PopularBrandCard from '../components/cards/PopularBrandWithTitle';
import { IconButton, Menu, MenuItem, Typography, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getHomeAdminData } from '../redux/admin/homeAdminSlice';
import { styled } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// Styled InputBase for the search field
const StyledSearchInput = styled(InputBase)(({ theme }) => ({
  flexGrow: 1, // Allows the input to take available space
  marginLeft: theme.spacing(1), // Space between icon and input
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid #c9c9c9',
  backgroundColor: '#fff',
}));

// Styled components for search results dropdown
const SearchResultsContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "calc(100% + 5px)", // Position below the search bar
  left: 0,
  right: 0,
  backgroundColor: "#fff",
  border: "1px solid #c9c9c9",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  maxHeight: "300px",
  overflowY: "auto",
  zIndex: 999, // Ensure dropdown is above other content
}));

const SearchResultItem = styled(Box)(({ theme }) => ({
  padding: "10px 15px",
  borderBottom: "1px solid #eee",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  "&:last-child": {
    borderBottom: "none",
  },
}));


const AllStores = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  // Select both 'stores' (for all stores/popular) and 'searchResults' (for search display)
  const { stores, searchResults, loading, error } = useSelector((state) => state.store);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // State for search input value
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Debounced search term
  const [showSearchDropdown, setShowSearchDropdown] = useState(false); // NEW: State for dropdown visibility

  const open = Boolean(anchorEl);
  const homeAdmin = useSelector((state) => state.homeAdmin) || {};
  const data = (homeAdmin.data && homeAdmin.data[0]) || {};

  // Fetch all stores and home admin data on mount
  useEffect(() => {
    dispatch(getStores()); // Fetch all stores initially
    dispatch(getHomeAdminData());
  }, [dispatch]);

  // Debounce effect for search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Effect to dispatch search API call based on debounced term
  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      dispatch(searchStores(debouncedSearchTerm)); // Call backend search API
    } else {
      dispatch(clearSearchResults()); // Clear search results from Redux state
    }
  }, [debouncedSearchTerm, dispatch]);


  // Handle category (alphabet) click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm(""); // Clear search term when changing category
    dispatch(clearSearchResults()); // Clear search results when applying alphabet filter
    setShowSearchDropdown(false); // Hide dropdown
  };

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCategory("All"); // Reset category filter when searching
  };

  const handleSearchFocus = () => {
    setShowSearchDropdown(true);
  };

  const handleSearchBlur = () => {
    // Delay hiding to allow click events on dropdown items
    setTimeout(() => {
      setShowSearchDropdown(false);
    }, 200);
  };

  const handleSearchResultClick = (storeId) => {
    navigate(`/store/${storeId}`); // Navigate to individual store page
    setSearchTerm(""); // Clear search term in input
    dispatch(clearSearchResults()); // Clear results from Redux state
    setShowSearchDropdown(false); // Hide dropdown
  };


  const categories = ["All", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

  // The main list of stores is now always filtered from the 'stores' array
  // and is NOT affected by the search bar's input.
  const finalFilteredStores =
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

      {/* === Popular Stores (Always show popular, not filtered by search/alphabet) === */}
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

          <Box className="flex items-center gap-2 relative"> {/* Added relative positioning for dropdown */}
            <IconButton className="!bg-[#592EA9] !rounded-lg hover:opacity-80">
              <SearchIcon className="text-white" />
            </IconButton>
            {/* Search Input Field */}
            <StyledSearchInput
              placeholder="Search stores..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />

            {/* Search Results Dropdown */}
            {showSearchDropdown && searchTerm.length > 0 && (
              <SearchResultsContainer>
                {loading ? (
                  <SearchResultItem>Loading...</SearchResultItem>
                ) : searchResults.length > 0 ? (
                  searchResults.map((store) => (
                    <SearchResultItem key={store._id} onClick={() => handleSearchResultClick(store._id)}>
                      <Typography variant="body2" fontWeight="bold">{store.storeName}</Typography>
                      <Typography variant="caption" color="textSecondary">{store.storeType}</Typography>
                    </SearchResultItem>
                  ))
                ) : (
                  <SearchResultItem>No stores found.</SearchResultItem>
                )}
              </SearchResultsContainer>
            )}

            {/* <button
              onClick={handleSortClick}
              className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-md"
            >
              Sort <ArrowDropDownIcon className="ml-1" />
            </button>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleClose}>Sort by Popularity</MenuItem>
              <MenuItem onClick={handleClose}>Sort by Name</MenuItem>
              <MenuItem onClick={handleClose}>Sort by Newest</MenuItem>
            </Menu> */}
          </Box>
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
        {Array.isArray(finalFilteredStores) && finalFilteredStores.length === 0 && !loading ? (
          <p className='text-center col-span-full text-gray-600'>No stores found matching your criteria.</p>
        ) : (
          finalFilteredStores?.map((store) => (
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
