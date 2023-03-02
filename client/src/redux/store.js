import { configureStore } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import sightSlice from './slices/sightSlice';
import typeSlice from './slices/typeSlice';
import citySlice from './slices/citySlice';
import continentSlice from './slices/continentSlice';
import countrySlice from './slices/countrySlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    sight: sightSlice,
    type: typeSlice,
    city: citySlice,
    country: countrySlice,
    continent: continentSlice,
  },
});
