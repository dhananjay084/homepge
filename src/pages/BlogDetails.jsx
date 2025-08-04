import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/Minor/Banner";
import Image from "../assets/banner-image.webp";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById, fetchBlogs } from "../redux/blog/blogSlice"; // ensure fetchBlogById is exported
import BlogCard from "../components/cards/BlogDetailsCard";

const BlogDetails = () => {
  const { id } = useParams(); // get ID from URL
  const dispatch = useDispatch();

  const { blogs = [], currentBlog, loading, error } = useSelector(
    (state) => state.blogs || {}
  );

  useEffect(() => {
    dispatch(fetchBlogs()); // optional: keep list updated
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentBlog) {
      console.log("Fetched blog:", currentBlog);
    }
  }, [currentBlog]);
  console.log(currentBlog)
  // Fallback placeholder content if blog has no body/content
  const defaultContent = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    culpa qui officia deserunt mollit anim id est laborum.
  `;

  // Assume the blog text is in currentBlog.content or currentBlog.body — adjust to your schema
  const blogContentRaw =
    currentBlog?.details 

  // For safe rendering: if the content is HTML, use dangerouslySetInnerHTML. Otherwise, show as plain text.
  const isHTML = /<\/?[a-z][\s\S]*>/i.test(blogContentRaw); // naive check

  return (
    <div className="p-4">
      <Banner
        Text="Every day we discuss the most interesting things"
        ColorText="discuss"
        BgImage={currentBlog.image}
      />

      <div className="my-4">
        {loading && !currentBlog ? (
          <p className="text-sm text-gray-500">Loading blog...</p>
        ) : error ? (
          <p className="text-sm text-red-600">Error: {error}</p>
        ) : currentBlog ? (
          <>
            <p className="text-sm text-purple-600 font-semibold">
              {new Date(currentBlog.createdAt || currentBlog.updatedAt).toLocaleDateString(undefined, {
                weekday: "long",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <h2 className="text-xl font-bold text-gray-900 mt-2">
              {currentBlog.heading || "Untitled"}
            </h2>
            <Typography
              sx={{ fontSize: "13px"}}
              dangerouslySetInnerHTML={
                isHTML
                  ? { __html: currentBlog.details }
                  : { __html: currentBlog.details  }
              }
            />
          </>
        ) : (
          <p className="text-sm text-gray-500">No blog found.</p>
        )}
      </div>

      <h2 className="font-semibold text-2xl my-8">All Blogs</h2>
      <div className="gap-4 overflow-x-auto flex">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} data={blog} border={true} />
        ))}
      </div>
    </div>
  );
};

export default BlogDetails;
