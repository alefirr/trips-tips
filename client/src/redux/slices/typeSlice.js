import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  list: [],
  loading: false,
};

export const getAllTypes = createAsyncThunk('type/getAllTypes', async () => {
  // try {
  const { data } = await axios.get('/types');
  return data;
  // } catch (error) {
  //   console.log(error);
  // }
});

export const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllTypes.pending]: (state) => {
      state.loading = true;
    },
    [getAllTypes.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    [getAllTypes.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const typeSliceReducer = typeSlice.reducer;
