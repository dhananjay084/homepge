import React, { useState } from 'react';
import TextLink from '../components/Minor/TextLink';
import PopularStores from '../components/cards/PopularStores';
import HeadingText from '../components/Minor/HeadingText';
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const BankOffer = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl); // Fix: derive open from anchorEl

  return (
    <div>
      <div className="flex justify-between items-center px-4">
        <div>
          <Typography variant="body1" fontWeight="bold" className="text-lg">
            Bank Offers
          </Typography>
          <Typography>28 Offers 14 Banks</Typography>
        </div>

        {/* Search & Sort Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleSortClick}
            className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-md"
          >
            Sort <ArrowDropDownIcon className="ml-1" />
          </button>

          {/* Sort Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={handleClose}>Sort by Popularity</MenuItem>
            <MenuItem onClick={handleClose}>Sort by Name</MenuItem>
            <MenuItem onClick={handleClose}>Sort by Newest</MenuItem>
          </Menu>
        </div>
      </div>

      <TextLink text="Popular Bank" colorText="Offers" link="" linkText="View All" />
      <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide">
        {[...Array(4)].map((_, index) => (
          <PopularStores key={index} />
        ))}
      </div>

      <TextLink text="Best Cards for Shopping" colorText="" link="" linkText="View All" />
      <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide">
        {[...Array(4)].map((_, index) => (
          <PopularStores key={index} />
        ))}
      </div>

      <TextLink text="Electronics Upto 6% Cashback" colorText="" link="" linkText="View All" />
      <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide">
        {[...Array(4)].map((_, index) => (
          <PopularStores key={index} />
        ))}
      </div>

      <TextLink text="Travel-Up Upto 6% Cashback" colorText="" link="" linkText="View All" />
      <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide">
        {[...Array(4)].map((_, index) => (
          <PopularStores key={index} />
        ))}
      </div>

      <TextLink text="Best Cards for Fuel" colorText="" link="" linkText="View All" />
      <div className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide">
        {[...Array(4)].map((_, index) => (
          <PopularStores key={index} />
        ))}
      </div>

      <HeadingText />
    </div>
  );
};

export default BankOffer;
