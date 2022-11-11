import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfileInterface } from '../../pages/profile';

export interface InitialState {
  loading: boolean;
  userInfo: [];
  userToken: null;
  error: boolean;
  success: boolean;
}

const initialState: InitialState = {
  loading: false,
  userInfo: [],
  userToken: null,
  error: false,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export default userSlice;
export const { addUser } = userSlice.actions;
