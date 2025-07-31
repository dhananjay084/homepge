import React, { useEffect, useState } from 'react';
import Banner from '../components/Minor/Banner';
import Image from "../assets/banner-image.webp"; // This import might be unused if Banner uses data.allCategoriesPageBanner
import TextLink from '../components/Minor/TextLink';
import CategoryCard from '../components/cards/CategoryCard';
import HeadingText from '../components/Minor/HeadingText';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, searchCategories, clearSearchResults } from '../redux/category/categorySlice'; // Import searchCategories and clearSearchResults
import { IconButton, Menu, MenuItem, Typography, InputBase, Box } from "@mui/material"; // Added InputBase and Box
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getHomeAdminData } from '../redux/admin/homeAdminSlice';
import { styled } from "@mui/material/styles"; // Import styled for custom input styling
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

const AllCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  // Select both 'categories' (for all categories/popular) and 'searchResults' (for search display)
  const { categories, searchResults, loading, error } = useSelector((state) => state.category);

  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // State for search input value
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // Debounced search term
  const [showSearchDropdown, setShowSearchDropdown] = useState(false); // NEW: State for dropdown visibility

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const homeAdmin = useSelector((state) => state.homeAdmin) || {};
  const data = (homeAdmin.data && homeAdmin.data[0]) || {};
  const alphabet = ["All", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

  useEffect(() => {
    dispatch(getCategories()); // Fetch all categories initially
    dispatch(getHomeAdminData());
  }, [dispatch]);

  // Debounce effect for search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Effect to dispatch search API call based on debounced term
  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      dispatch(searchCategories(debouncedSearchTerm)); // Call backend search API
    } else {
      dispatch(clearSearchResults()); // Clear search results from Redux state
    }
  }, [debouncedSearchTerm, dispatch]);

  // Effect to re-filter categories for the main display (only by alphabet)
  useEffect(() => {
    filterCategoriesByLetter(selectedLetter);
  }, [categories, selectedLetter]); // Only depend on categories and selectedLetter

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
    setSearchTerm(""); // Clear search term when applying alphabet filter
    dispatch(clearSearchResults()); // Clear search results from Redux state
    setShowSearchDropdown(false); // Hide dropdown
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedLetter("All"); // Reset alphabet filter when searching
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

  const handleSearchResultClick = (categoryId) => {
    navigate(`/category?name=${categoryId}`); // Navigate to individual category page (assuming this route exists)
    setSearchTerm(""); // Clear search term in input
    dispatch(clearSearchResults()); // Clear results from Redux state
    setShowSearchDropdown(false); // Hide dropdown
  };

  // const handleSortClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };

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
          <p className="text-center w-full">No popular categories found.</p>
        )}
      </div>

      {/* Filter */}
      <div className="w-full px-4 md:px-8 py-2 flex flex-col gap-4 my-6">
        {/* Top Section */}
        <div className="flex justify-between items-center">
          <Typography variant="body1" fontWeight="bold" className="text-lg">
            See All <Typography color="primary" display="inline">categories</Typography>
          </Typography>

          <Box className="flex items-center gap-2 relative"> {/* Added relative positioning for dropdown */}
            <IconButton className="!bg-[#592EA9] !rounded-lg hover:opacity-80">
              <SearchIcon className="text-white" />
            </IconButton>
            {/* Search Input Field */}
            <StyledSearchInput
              placeholder="Search categories..."
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
                  searchResults.map((cat) => (
                    <SearchResultItem key={cat._id} onClick={() => handleSearchResultClick(cat.name)}>
                      <Typography variant="body2" fontWeight="bold">{cat.name}</Typography>
                      {/* You might add other relevant category details here if available */}
                      {/* <Typography variant="caption" color="textSecondary">{cat.description}</Typography> */}
                    </SearchResultItem>
                  ))
                ) : (
                  <SearchResultItem>No categories found.</SearchResultItem>
                )}
              </SearchResultsContainer>
            )}

            {/* <button
              onClick={handleSortClick}
              className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-md"
            >
              Sort <ArrowDropDownIcon className="ml-1" />
            </button>

            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Sort by Popularity</MenuItem>
              <MenuItem onClick={handleMenuClose}>Sort by Name</MenuItem>
              <MenuItem onClick={handleMenuClose}>Sort by Newest</MenuItem>
            </Menu> */}
          </Box>
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
          <p className="text-center w-full col-span-full">
            {loading ? "Loading categories..." : "No categories found matching your criteria."}
          </p>
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
