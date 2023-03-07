import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllCities } from '../../redux/slices/countrySlice';
import { ListPage } from '../templates';
import './CountryPage.css';

export const CountryPage = () => {
  const { countryId } = useParams();
  const countryName = useSelector(
    (state) =>
      state.country.list.find((country) => country._id === countryId).name
  );

  return (
    <ListPage
      title={`Explore ${countryName}`}
      entityName="city"
      fetcher={getAllCities}
      selector={(state) =>
        state.city.list.filter((city) => city.country === countryId)
      }
    />
  );
};
