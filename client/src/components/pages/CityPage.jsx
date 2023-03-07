import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllCities, getAllCountries, getAllSights } from '../../redux';
import { ListPage } from '../templates';

export const CityPage = () => {
  const dispatch = useDispatch();
  const { cityId } = useParams();

  const countries = useSelector((state) => state.country.list);
  const cities = useSelector((state) => state.city.list);

  useEffect(() => {
    if (!countries.length) {
      dispatch(getAllCountries());
    }
    if (!cities.length) {
      dispatch(getAllCities());
    }
  }, [cities.length, countries.length, dispatch]);

  const cityName = useMemo(
    () => cities.find((city) => city._id === cityId)?.name,
    [cities, cityId]
  );

  const pageTitle = `Explore ${cityName}`;

  return (
    <ListPage
      title={pageTitle}
      displayEntity="sight"
      fetcher={getAllSights}
      selector={(state) =>
        state.sight.list.filter((sight) => sight.city === cityId)
      }
    />
  );
};
