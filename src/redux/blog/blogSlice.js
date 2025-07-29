import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './blogApi';

// Fetch all blogs
export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
  const response = await api.getAllBlogs();
  return response.data;
});

// Create new blog
export const createBlog = createAsyncThunk('blogs/createBlog', async (blogData) => {
  const response = await api.addBlog(blogData);
  return response.data;
});

// Update blog
export const updateBlog = createAsyncThunk('blogs/updateBlog', async ({ id, blogData }) => {
  const response = await api.editBlog(id, blogData);
  return response.data;
});

// Delete blog
export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (id) => {
  await api.removeBlog(id);
  return id;
});

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create Blog
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })

      // Update Blog
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })

      // Delete Blog
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
