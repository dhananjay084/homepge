// src/components/NavBar.jsx (or wherever)
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import Person3Icon from '@mui/icons-material/Person3';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchDeals, clearSearchResults } from '../redux/deal/dealSlice';
import { logoutUser, checkCurrentUser } from '../redux/auth/authApi';

const SearchBar = styled(Box)(() => ({
  backgroundColor: '#fff',
  padding: '10px 12px',
  borderRadius: '14px',
  border: '1px solid #c9c9c9',
  width: '100%',
  marginTop: '8px',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  zIndex: 1000,
}));

const SearchIconWrapper = styled('div')(() => ({
  position: 'absolute',
  left: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  borderRadius: '8px',
  padding: '5px',
  background: '#592EA9',
}));

const StyledInputBase = styled(InputBase)(() => ({
  width: '100%',
  paddingLeft: '40px',
}));

const SearchResultsContainer = styled(Box)(() => ({
  position: 'absolute',
  top: 'calc(100% + 5px)',
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  border: '1px solid #c9c9c9',
  borderRadius: '8px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  maxHeight: '300px',
  overflowY: 'auto',
  zIndex: 999,
}));

const SearchResultItem = styled(Box)(() => ({
  padding: '10px 15px',
  borderBottom: '1px solid #eee',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchResults, loading } = useSelector((state) => state.deal);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Hydrate auth status on mount (so navbar knows)
  useEffect(() => {
    dispatch(checkCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      dispatch(searchDeals(debouncedSearchTerm));
    } else {
      dispatch(clearSearchResults());
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleResultClick = (deal) => {
    navigate(`/deal/${deal._id}?category=${deal.categorySelect}`);
    setShowResults(false);
    setSearchTerm('');
    dispatch(clearSearchResults());
  };

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleProfile = () => {
    navigate('/profilepage');
    handleMenuClose();
  };

  const handleLogout = async () => {
    handleMenuClose();
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const handleLogin = () => {
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: 'none', padding: '10px 0' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', color: 'black' }}>
        <Box display="flex" alignItems="center">
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

        <IconButton onClick={handleMenuOpen}>
          <Person3Icon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
          {isAuthenticated ? (
            <>
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </>
          ) : (
            <MenuItem onClick={handleLogin}>Login</MenuItem>
          )}
        </Menu>
      </Toolbar>

      <Box px={2} sx={{ position: 'relative' }}>
        <SearchBar>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search for deals"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
            fullWidth
          />
          {showResults && searchTerm && (
            <SearchResultsContainer>
              {loading ? (
                <SearchResultItem>Loading...</SearchResultItem>
              ) : searchResults.length > 0 ? (
                searchResults.map((deal) => (
                  <SearchResultItem key={deal._id} onClick={() => handleResultClick(deal)}>
                    <Typography variant="body2" fontWeight="bold" color="textSecondary">
                      {deal.dealTitle}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {deal.store}
                    </Typography>
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
