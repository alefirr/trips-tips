import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  list: [],
  loading: false,
};

export const addCity = createAsyncThunk('post/addCity', async (params) => {
  // try {
  const { data } = await axios.post('/cities', params);
  return data;
  // } catch (error) {
  //   console.log(error);
  // }
});

export const getAllCities = createAsyncThunk('city/getAllCities', async () => {
  try {
    const { data } = await axios.get('/cities');
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removeCity = createAsyncThunk('city/removeCity', async (id) => {
  try {
    const { data } = await axios.delete(`/cities/${id}`, id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateCity = createAsyncThunk(
  'city/updateCity',
  async (updatedCity) => {
    try {
      const { data } = await axios.put(
        `/cities/${updatedCity._id}`,
        updatedCity
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {},
  extraReducers: {
    // Создание поста
    [addCity.pending]: (state) => {
      state.loading = true;
    },
    [addCity.fulfilled]: (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
    },
    [addCity.rejected]: (state) => {
      state.loading = false;
    },
    // Получаение всех постов
    [getAllCities.pending]: (state) => {
      state.loading = true;
    },
    [getAllCities.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    [getAllCities.rejected]: (state) => {
      state.loading = false;
    },
    // Удаление поста
    [removeCity.pending]: (state) => {
      state.loading = true;
    },
    [removeCity.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = state.list.filter((city) => city._id !== action.payload._id);
    },
    [removeCity.rejected]: (state) => {
      state.loading = false;
    },
    // Обновление поста
    [updateCity.pending]: (state) => {
      state.loading = true;
    },
    [updateCity.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.list.findIndex(
        (city) => city._id === action.payload._id
      );
      state.list[index] = action.payload;
    },
    [updateCity.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const citySliceReducer = citySlice.reducer;
