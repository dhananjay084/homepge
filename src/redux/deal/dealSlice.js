import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllDeals,
  createDeal,
  deleteDealById,
  updateDealById,
} from './dealAPI';
import { toast } from 'react-toastify';

export const getDeals = createAsyncThunk('deal/getDeals', async (_, thunkAPI) => {
  try {
    return await getAllDeals();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const addDeal = createAsyncThunk('deal/addDeal', async (deal, thunkAPI) => {
  try {
    return await createDeal(deal);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const deleteDeal = createAsyncThunk('deal/deleteDeal', async (id, thunkAPI) => {
  try {
    await deleteDealById(id);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateDeal = createAsyncThunk('deal/updateDeal', async ({ id, data }, thunkAPI) => {
  try {
    return await updateDealById(id, data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});
export const getSingleDeal = createAsyncThunk('deal/getSingleDeal', async (id, thunkAPI) => {
    try {
      return await getDealById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  });
  
const dealSlice = createSlice({
  name: 'deal',
  initialState: {
    deals: [],
    singleDeal: null,
    loading: false,
    error: null,
  },
  
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(getDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Fetch failed: ${action.payload}`);
      })

      .addCase(addDeal.fulfilled, (state, action) => {
        state.deals.push(action.payload);
        toast.success('Deal added!');
      })
      .addCase(addDeal.rejected, (state, action) => {
        toast.error(`Add failed: ${action.payload}`);
      })

      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.deals = state.deals.filter((d) => d._id !== action.payload);
        toast.success('Deal deleted');
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        toast.error(`Delete failed: ${action.payload}`);
      })

      .addCase(updateDeal.fulfilled, (state, action) => {
        const index = state.deals.findIndex((d) => d._id === action.payload._id);
        if (index !== -1) state.deals[index] = action.payload;
        toast.success('Deal updated');
      })
      .addCase(updateDeal.rejected, (state, action) => {
        toast.error(`Update failed: ${action.payload}`);
      })
      .addCase(getSingleDeal.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.singleDeal = action.payload;
      })
      .addCase(getSingleDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Get Deal failed: ${action.payload}`);
      });
      
  },
});

export default dealSlice.reducer;
