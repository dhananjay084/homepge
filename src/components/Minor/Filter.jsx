import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Filter = ({text}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Generate categories from A to Z
  const categories = ["All", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

  return (
    <div className="w-full px-4 md:px-8 py-2 flex flex-col gap-4 my-4">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <Typography variant="body1" fontWeight="bold" className="text-lg">
          See All <Typography color="primary">{text}</Typography>
        </Typography>

        {/* Search & Sort Buttons */}
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

          {/* Sort Dropdown Menu */}
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Sort by Popularity</MenuItem>
            <MenuItem onClick={handleClose}>Sort by Name</MenuItem>
            <MenuItem onClick={handleClose}>Sort by Newest</MenuItem>
          </Menu>
        </div>
      </div>

      {/* Categories List */}
      <div className="w-full overflow-x-auto whitespace-nowrap no-scrollbar">
        <div className="flex gap-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-[10px] border ${
                category === "All" ? "bg-[#592EA9] text-white" : "border-gray-400 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
Filter.defaultProps={
    text:''
}
export default Filter;
