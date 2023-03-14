import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  list: [],
  loading: false,
};

export const addCountry = createAsyncThunk(
  'country/addCountry',
  async (params) => {
    // try {
    const { data } = await axios.post('/countries', params);
    return data;
    // } catch (error) {
    //   console.log(error);
    // }
  }
);

export const getAllCountries = createAsyncThunk(
  'country/getAllCountries',
  async () => {
    try {
      const { data } = await axios.get('/countries');
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeCountry = createAsyncThunk(
  'country/removeCountry',
  async (id) => {
    try {
      const { data } = await axios.delete(`/countries/${id}`, id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateCountry = createAsyncThunk(
  'country/updateCountry',
  async (updatedCountry) => {
    try {
      const { data } = await axios.put(
        `/countries/${updatedCountry._id}`,
        updatedCountry
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
  extraReducers: {
    // Создание поста
    [addCountry.pending]: (state) => {
      state.loading = true;
    },
    [addCountry.fulfilled]: (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
    },
    [addCountry.rejected]: (state) => {
      state.loading = false;
    },
    // Получаение всех постов
    [getAllCountries.pending]: (state) => {
      state.loading = true;
    },
    [getAllCountries.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    [getAllCountries.rejected]: (state) => {
      state.loading = false;
    },
    // Удаление поста
    [removeCountry.pending]: (state) => {
      state.loading = true;
    },
    [removeCountry.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = state.list.filter(
        (country) => country._id !== action.payload._id
      );
    },
    [removeCountry.rejected]: (state) => {
      state.loading = false;
    },
    // Обновление поста
    [updateCountry.pending]: (state) => {
      state.loading = true;
    },
    [updateCountry.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.list.findIndex(
        (country) => country._id === action.payload._id
      );
      state.list[index] = action.payload;
    },
    [updateCountry.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const countrySliceReducer = countrySlice.reducer;
