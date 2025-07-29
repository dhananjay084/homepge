import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Typography } from '@mui/material';
const BlogCard = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="min-w-[300px] bg-white shadow-md rounded-xl overflow-hidden transition-all duration-300">
      <img src={blog.image} alt={blog.heading} className="w-full h-40 object-cover md:h-60 lg:h-80" />

      <div className="p-4">
        <div className="flex justify-between items-center">
          {/* <p className="text-sm text-purple-600">Sunday, 1 Jan 2023</p> */}
          <p className="text-sm text-purple-600">
  {new Date(blog.updatedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}
</p>
          <button
            onClick={toggleExpand}
            className="text-purple-600 transition-transform duration-300"
            aria-label="Toggle expand"
          >
            <FaChevronDown
              className={`transform transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        <h2 className="text-lg font-bold mt-2">{blog.heading}</h2>

        <p
          className={`text-sm text-gray-600 mt-1 overflow-hidden transition-all duration-300 ${
            isExpanded ? 'line-clamp-none max-h-[500px] overflow-y-scroll' : 'line-clamp-3 max-h-[4.5em]'
          }`}
        >
          {/* {blog.details} */}
            <Typography
                    sx={{ fontSize: '13px' }}
                    dangerouslySetInnerHTML={{ __html: blog.details }}
                  />
        </p>

        <div className="flex gap-2 mt-2 flex-wrap">
          {blog.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-purple-100 text-purple-600 rounded-full px-2 py-1">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
