import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  list: [],
  loading: false,
};

export const getAllContinents = createAsyncThunk(
  'continent/getAllContinents',
  async () => {
    try {
      const { data } = await axios.get('/continents');
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const continentSlice = createSlice({
  name: 'continent',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllContinents.pending]: (state) => {
      state.loading = true;
    },
    [getAllContinents.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    [getAllContinents.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default continentSlice.reducer;
