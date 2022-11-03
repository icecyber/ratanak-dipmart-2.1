import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';
import userSlice from './profile/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
});
export default store;
