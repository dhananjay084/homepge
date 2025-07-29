import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogs } from '../redux/blog/blogSlice';
import BlogCard from '../components/cards/BlogCard';

const BlogsPage = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.blogs);


  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Recent Blog Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
