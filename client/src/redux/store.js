import { configureStore } from '@reduxjs/toolkit';

import {
  authSliceReducer,
  sightSliceReducer,
  typeSliceReducer,
  citySliceReducer,
  countrySliceReducer,
  continentSliceReducer,
} from './slices';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    sight: sightSliceReducer,
    type: typeSliceReducer,
    city: citySliceReducer,
    country: countrySliceReducer,
    continent: continentSliceReducer,
  },
});
