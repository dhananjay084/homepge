import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCategoriesAPI,
  addCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
} from './categoryApi';

// Thunks
export const getCategories = createAsyncThunk('category/getCategories', async () => {
  return await getCategoriesAPI();
});

export const addCategory = createAsyncThunk('category/addCategory', async (data) => {
  return await addCategoryAPI(data);
});

export const updateCategory = createAsyncThunk('category/updateCategory', async ({ id, data }) => {
  return await updateCategoryAPI({ id, data });
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id) => {
  return await deleteCategoryAPI(id);
});

// Slice
const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((cat) => cat._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat._id !== action.meta.arg);
      });
  },
});

export default categorySlice.reducer;
