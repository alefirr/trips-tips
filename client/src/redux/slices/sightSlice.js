import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  list: [],
  loading: false,
};

export const addSight = createAsyncThunk('post/addSight', async (params) => {
  // try {
  const { data } = await axios.post('/sights', params);
  return data;
  // } catch (error) {
  //   console.log(error);
  // }
});

export const getAllSights = createAsyncThunk('sight/getAllSights', async () => {
  try {
    const { data } = await axios.get('/sights');
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removeSight = createAsyncThunk('sight/removeSight', async (id) => {
  try {
    const { data } = await axios.delete(`/sights/${id}`, id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updateSight = createAsyncThunk(
  'sight/updateSight',
  async (updatedSight) => {
    try {
      const { data } = await axios.put(
        `/sights/${updatedSight._id}`,
        updatedSight
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const sightSlice = createSlice({
  name: 'sight',
  initialState,
  reducers: {},
  extraReducers: {
    // Создание поста
    [addSight.pending]: (state) => {
      state.loading = true;
    },
    [addSight.fulfilled]: (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
    },
    [addSight.rejected]: (state) => {
      state.loading = false;
    },
    // Получаение всех постов
    [getAllSights.pending]: (state) => {
      state.loading = true;
    },
    [getAllSights.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = action.payload;
    },
    [getAllSights.rejected]: (state) => {
      state.loading = false;
    },
    // Удаление поста
    [removeSight.pending]: (state) => {
      state.loading = true;
    },
    [removeSight.fulfilled]: (state, action) => {
      state.loading = false;
      state.list = state.list.filter(
        (sight) => sight._id !== action.payload._id
      );
    },
    [removeSight.rejected]: (state) => {
      state.loading = false;
    },
    // Обновление поста
    [updateSight.pending]: (state) => {
      state.loading = true;
    },
    [updateSight.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.list.findIndex(
        (sight) => sight._id === action.payload._id
      );
      state.list[index] = action.payload;
    },
    [updateSight.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const sightSliceReducer = sightSlice.reducer;
