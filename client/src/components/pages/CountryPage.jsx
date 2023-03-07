import React from 'react';
import { getCountryCities } from '../../redux/slices/countrySlice';
import { ListPage } from '../templates';
import './CountryPage.css';

export const CountryPage = () => {
  return (
    <ListPage
      title={(country) => `Explore ${country.name}`}
      entityName="city"
      fetcher={getCountryCities}
      selector={(state) => state.country.list}
    />
  );
};
