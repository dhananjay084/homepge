import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box } from "@mui/material";
import { Menu, 
  // Notifications
 } from "@mui/icons-material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import Person3Icon from "@mui/icons-material/Person3";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchDeals, getDeals, clearSearchResults } from "../redux/deal/dealSlice"; // Import clearSearchResults

// Styled SearchBar with relative positioning
const SearchBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "10px 12px",
  borderRadius: "14px",
  border: "1px solid #c9c9c9",
  width: "100%",
  marginTop: "8px",
  position: "relative",
  display: "flex",
  alignItems: "center",
  zIndex: 1000,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  left: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  borderRadius: "8px",
  padding: "5px",
  background: "#592EA9",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  paddingLeft: "40px",
}));

const SearchResultsContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "calc(100% + 5px)",
  left: 0,
  right: 0,
  backgroundColor: "#fff",
  border: "1px solid #c9c9c9",
  borderRadius: "8px",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  maxHeight: "300px",
  overflowY: "auto",
  zIndex: 999,
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

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Now select searchResults specifically for the dropdown
  const { searchResults, loading } = useSelector((state) => state.deal);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Debounce effect for search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Effect to dispatch search API call or clear results
  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      dispatch(searchDeals(debouncedSearchTerm));
    } else {
      // If search term is empty, clear search results
      dispatch(clearSearchResults());
      // Optionally, if you want to re-fetch all deals for the main page
      // when the search bar is cleared, you can dispatch getDeals() here.
      // dispatch(getDeals());
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResultClick = (deal) => {
    navigate(`/deal/${deal._id}?category=${deal.categorySelect}`);
    setShowResults(false);
    setSearchTerm(""); // Clear search term in input
    dispatch(clearSearchResults()); // Clear results from Redux state
  };

  const handleFocus = () => {
    setShowResults(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none", padding: "10px 0" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", color: "black" }}>
        <Box display="flex" alignItems="center">
          {/* <IconButton edge="start">
            <Menu />
          </IconButton> */}
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            color="primary"
            component={Link}
            to="/"
            sx={{ cursor: 'pointer', textDecoration: 'none' }}
          >
            MY COUPON STOCK
          </Typography>
        </Box>
      </Toolbar>

      {/* Search Bar Below Navbar */}
      <Box px={2} sx={{ position: "relative" }}>
        <SearchBar>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            fullWidth
            placeholder="Search for deals"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {/* Display searchResults, not deals */}
          {showResults && searchTerm.length > 0 && (
            <SearchResultsContainer>
              {loading ? (
                <SearchResultItem>Loading...</SearchResultItem>
              ) : searchResults.length > 0 ? (
                searchResults.map((deal) => (
                  <SearchResultItem key={deal._id} onClick={() => handleResultClick(deal)}>
                    <Typography variant="body2" fontWeight="bold" color="textSecondary">{deal.dealTitle}</Typography>
                    <Typography variant="caption" color="textSecondary">{deal.store}</Typography>
                  </SearchResultItem>
                ))
              ) : (
                <SearchResultItem>No deals found.</SearchResultItem>
              )}
            </SearchResultsContainer>
          )}
        </SearchBar>
      </Box>
    </AppBar>
  );
};

export default NavBar;
