import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../../components/axios/axiosHttp';

const initialState = {
  loading: false,
  userInfo: {},
  userToken: null,
  error: false,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice;
