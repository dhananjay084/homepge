// ✅ storeSlice.js (redux/store/storeSlice.js)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    addStoreAPI,
  getStoresAPI,
  deleteStoreAPI,
  updateStoreAPI,
  getStoreByIdAPI,
} from './storeAPI.js';
import axios from 'axios';
export const getStores = createAsyncThunk('store/getStores', async () => {
  return await getStoresAPI();
});

export const addStore = createAsyncThunk('store/addStore', async (storeData) => {
  return await addStoreAPI(storeData);
});

export const deleteStore = createAsyncThunk('store/deleteStore', async (id) => {
  return await deleteStoreAPI(id);
});

export const updateStore = createAsyncThunk(
    'store/updateStore',
    async ({ id, data }) => {
      return await updateStoreAPI({ id, data }); 
    }
  );
  export const getStoreById = createAsyncThunk('store/getStoreById', async (id) => {
    return await getStoreByIdAPI(id);
  });

  

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    stores: [],
    loading: false,
    error: null,
    
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStores.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addStore.fulfilled, (state, action) => {
        state.stores.push(action.payload);
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.stores = state.stores.filter(store => store._id !== action.payload.id);
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        const index = state.stores.findIndex(store => store._id === action.payload._id);
        if (index !== -1) {
          state.stores[index] = action.payload;
        }
      })
      .addCase(getStoreById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStoreById.fulfilled, (state, action) => {
        state.loading = false;
        state.storeDetails = action.payload;
      })
      .addCase(getStoreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.storeDetails = null;
      });
  },
});

export default storeSlice.reducer;
