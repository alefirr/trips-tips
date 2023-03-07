import React from 'react';
import { getAllCountries } from '../../redux';
import { ListPage } from '../templates';

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
