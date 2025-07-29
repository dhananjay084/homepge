import { configureStore } from '@reduxjs/toolkit';
import dealReducer from './deal/dealSlice';
import storeReducer from './store/storeSlice';
import categoryReducer from './category/categorySlice';
import newsletterReducer from './newsletter/newsletterSlice';
import reviewReducer from './review/reviewSlice.js';
import blogReducer from './blog/blogSlice';
import adminReducer from './admin/homeAdminSlice.js'

export const store = configureStore({
  reducer: {
    deal: dealReducer,
    store: storeReducer,
    category: categoryReducer,
    newsletter: newsletterReducer,
    reviews: reviewReducer,
    blogs: blogReducer,
    homeAdmin: adminReducer,
  },
});
