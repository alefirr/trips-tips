import React from 'react';
import { getAllCountries } from '../../redux/slices/countrySlice';
import { ListPage } from '../templates';
import './MainPage.css';

export const MainPage = () => {
  return (
    <ListPage
      title="Start Your Journey Now"
      entityName="country"
      fetcher={getAllCountries}
      selector={(state) => state.country.list}
    />
  );
};
