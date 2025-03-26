import React from "react";
import { AppBar, Toolbar, IconButton, Typography, InputBase, Box } from "@mui/material";
import { Menu, Notifications } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Person3Icon from "@mui/icons-material/Person3";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import { Link } from "react-router";
// Styled SearchBar with relative positioning
const SearchBar = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "10px 12px",
  borderRadius: "14px",
  border:'1px solid #c9c9c9',
  width: "100%",
  marginTop: "8px",
  position: "relative", // Required for absolute positioning of the icon
  display: "flex",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  left: "10px", // Adjust icon position
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  borderRadius:'8px',
  padding:'5px',
  background:'#592EA9'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  paddingLeft: "40px", // To prevent text overlap with the icon
}));

const NavBar = () => (
  <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none", padding: "10px 0" }}>
    <Toolbar sx={{ display: "flex", justifyContent: "space-between", color: "black" }}>
      <Box display="flex" alignItems="center">
        <IconButton edge="start">
          <Menu />
        </IconButton>
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

      <Box display="flex" alignItems="center">
        <IconButton>
          <Notifications />
        </IconButton>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
        <IconButton>
          <Person3Icon />
        </IconButton>
      </Box>
    </Toolbar>

    {/* Search Bar Below Navbar */}
    <Box px={2}>
      <SearchBar>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase fullWidth placeholder="Search for deals" />
      </SearchBar>
    </Box>
  </AppBar>
);

export default NavBar;
