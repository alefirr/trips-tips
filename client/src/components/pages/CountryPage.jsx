import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllCities, getAllCountries } from '../../redux';
import { ListPage } from '../templates';

export const CountryPage = () => {
  const dispatch = useDispatch();
  const { countryId } = useParams();

  const countries = useSelector((state) => state.country.list);

  useEffect(() => {
    if (!countries.length) {
      dispatch(getAllCountries());
    }
  }, [countries.length, dispatch]);

  const countryName = useMemo(
    () => countries.find((country) => country._id === countryId)?.name,
    [countries, countryId]
  );

  const pageTitle = `Explore ${countryName}`;

  return (
    <ListPage
      title={pageTitle}
      displayEntity="city"
      fetcher={getAllCities}
      selector={(state) =>
        state.city.list.filter((city) => city.country === countryId)
      }
    />
  );
};
