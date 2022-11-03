import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createListenerEntry } from '@reduxjs/toolkit/dist/listenerMiddleware';
import customAxios from '../components/axios/axiosHttp';

export const getBadge = createAsyncThunk('cart/getBadge', async () => {
  return await customAxios
    .get('/api/method/dipmarts_app.api.cartlist')
    .then((response) => response.data);
});

interface state {
  cartList: [];
  badge: number;
  isLoading: boolean;
  isSuccess: boolean;
}

const initialState: state = {
  cartList: [],
  badge: 0,
  isLoading: false,
  isSuccess: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action) => {
      action.payload = state.badge++;
    },
    initialBadge: (state, action) => {
      state.badge = action.payload;
    },
    decresment: (state, action) => {
      action.payload = state.badge--;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBadge.pending, (state, action) => {
      (state.isLoading = true), (state.isSuccess = false);
    });
    builder.addCase(getBadge.fulfilled, (state, action) => {
      state.cartList = action.payload;
      (state.isLoading = false), (state.isSuccess = true);
    });
    builder.addCase(getBadge.rejected, (state, action) => {
      (state.isLoading = false), (state.isSuccess = false);
    });
  },
});

export const { increment, initialBadge, decresment } = cartSlice.actions;
export default cartSlice;
